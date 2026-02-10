import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('userToken') !== null) {
      const myToken: any = { token: localStorage.getItem('userToken') };
      req = req.clone({ setHeaders: myToken });
    }
  }
  return next(req);
};
