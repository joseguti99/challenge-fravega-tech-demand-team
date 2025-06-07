import { AxiosInstance } from 'axios';
import routes from '../utils/routes';
import httpStatus from '../utils/httpStatus';

export const attach403RedirectInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === httpStatus.forbidden) {
        window.location.assign(routes.forbidden);
      }
      return Promise.reject(error);
    }
  );
};
