import Cookies from 'js-cookie';
const TOKEN_KEY = 'auth_token';

export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 1/6 });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};