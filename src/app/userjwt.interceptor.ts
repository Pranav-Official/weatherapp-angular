import { HttpInterceptorFn } from '@angular/common/http';

export const userJwtInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:3000';
  // Check if the request URL matches the base URL or starts with it
  if (req.url.startsWith(baseUrl)) {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      return next(authReq);
    } else {
      console.warn('No access token found for request to base URL');
      return next(req);
    }
  } else {
    return next(req);
  }
};
