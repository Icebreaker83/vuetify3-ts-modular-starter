const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

const SECRET_KEY = '123456789';
const expiresIn = '1h';
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
const isAuthenticated = ({ username, password }) => {
  return (
    userdb.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
};

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!isAuthenticated({ username, password })) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken({ username, password }, expiresIn);
  const refreshToken = createToken(
    { username, password },
    refreshTokenExpiresIn
  );
  res.status(200).json({ accessToken, refreshToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
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
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('Run Auth API Server on localhost:3000');
});
