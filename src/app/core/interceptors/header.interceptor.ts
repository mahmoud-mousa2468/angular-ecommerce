import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('uToken') !== null) {
    const myToken: any = { token: localStorage.getItem('uToken') };
    req = req.clone({ setHeaders: myToken });
  }
  return next(req);
};
