const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

// // Apply rewriter middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

const SECRET_KEY = '123456789';
const expiresIn = '2m';
const refreshTokenExpiresIn = '1d';

// Create a token from a payload
const createToken = (payload, expiresIn) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify the token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
};

// Check if the user exists in database
const getUser = ({ login, password }) => {
  return userdb.users.find(
    (user) => user.username === login && user.password === password
  );
};

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const getFilteredData = (data, request) => {
  // Extract filter parameters from req.query
  const filters = request.query.filter || {};
  // Apply filters
  return data.filter((item) =>
    Object.keys(filters).every((filterKey) => {
      const baseKey = filterKey.replace(/-(From|To)$/, '');
      const filterValue = filters[filterKey];
      const itemValue = item[baseKey];

      if (filterKey.endsWith('-From')) {
        const dateFilterValue = new Date(filterValue);
        const dateItemValue = new Date(itemValue);
        if (isValidDate(dateFilterValue) && isValidDate(dateItemValue))
          return dateItemValue >= dateFilterValue;
      }
      if (filterKey.endsWith('-To')) {
        const dateFilterValue = new Date(`${filterValue}T23:59:59.9999999`);
        const dateItemValue = new Date(itemValue);
        if (isValidDate(dateFilterValue) && isValidDate(dateItemValue))
          return dateItemValue <= dateFilterValue;
      }
      return String(itemValue).includes(String(filterValue));
    })
  );
};

const getPaginatedData = (data, _page, _limit) => {
  const page = parseInt(_page, 10) || 1;
  const limit = parseInt(_limit, 10) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return data.slice(startIndex, endIndex);
};

server.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = getUser({ login, password });
  if (!user) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken({ login, user_name: user.name }, expiresIn);
  const refreshToken = createToken(
    { login, user_name: user.name },
    refreshTokenExpiresIn
  );
  res.status(200).json({ payload: { accessToken, refreshToken } });
});

server.get('/login/refresh', (req, res) => {
  const refreshToken = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = verifyToken(refreshToken);
    const accessToken = createToken(
      { login: decodedToken.login, user_name: decodedToken.user_name },
      expiresIn
    );
    res.status(200).json({ payload: { accessToken } });
  } catch (error) {
    const status = 401;
    const message = 'Error: refreshToken is not valid';
    res.status(status).json({ status, message, error });
  }
});

server.use(/^(?!\/login).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);

    if (req.originalUrl.startsWith('/security/users')) {
      const users = router.db.get('users').value();
      // Apply filters
      const filteredUsers = getFilteredData(users, req);
      // Get the paginated users
      const rows = getPaginatedData(
        filteredUsers,
        req.query.pageNumber,
        req.query.pageSize
      );

      const totalRows = users.length;
      res.status(200).json({ totalRows, rows });
      return;
    }
  } catch (error) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({ status, message, error });
  }
});

server.use('/api', router);

server.listen(3000, () => {
  console.log('Run Auth API Server on localhost:3000');
});
