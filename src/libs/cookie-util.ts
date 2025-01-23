import Cookie from 'js-cookie';

import { cookieConstants } from 'src/constants/cookie-constants';

export const clearCookie = (key: string) => {
  Cookie.remove(key);
};

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

export const getUserCookie = () => {
  return getCookie(cookieConstants.USER);
};

export const clearUserCookie = () => {
  Cookie.remove(cookieConstants.USER);
};
