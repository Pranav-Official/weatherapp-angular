import { HttpInterceptorFn } from '@angular/common/http';

export const userJwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('accessToken');
  const baseUrl = 'http://localhost:3000';
  const authReq = req.clone({
    url: `${baseUrl}/${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
  return next(authReq);
};
