export const endpoints = {
  login: (login: string, password: string) => ({
    method: 'post',
    url: 'login',
    data: { login, password },
  }),
  refresh: {
    method: 'get',
    url: 'login/refresh'
  } 
};
