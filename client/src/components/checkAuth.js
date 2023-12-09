import { decodeToken, isExpired } from 'react-jwt';
import Cookies from 'js-cookie';

const getAccessToken = () => {
  return Cookies.get('access_token_cookie');
};

const getRefreshToken = () => {
  return Cookies.get('refresh_token_cookie');
};

export const checkAuth = () => {
  try {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false; // Either access token or refresh token is not present
    }

    const decodedAccessToken = decodeToken(accessToken);
    const decodedRefreshToken = decodeToken(refreshToken);

    const isAccessTokenExpired = isExpired(decodedAccessToken);
    const isRefreshTokenExpired = isExpired(decodedRefreshToken);

    return !isAccessTokenExpired && !isRefreshTokenExpired; // Both tokens are present and not expired
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false; // An error occurred, consider the user not authenticated
  }
};
