import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService);
  // Req Logic
  return next(req).pipe(
    catchError((err) => {
      // logic -Errors
      console.log('interceptors', err.error.message);
      _ToastrService.error(err.error.message, 'Fresh Cart');
      return throwError(() => err);
    })
  );
};
