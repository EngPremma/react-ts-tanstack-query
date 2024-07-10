const TOKEN = 'token';

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN);
};
