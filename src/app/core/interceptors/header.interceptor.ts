import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('userToken') !== null) {
    const myToken: any = { token: localStorage.getItem('userToken') };
    req = req.clone({ setHeaders: myToken });
  }
  return next(req);
};
