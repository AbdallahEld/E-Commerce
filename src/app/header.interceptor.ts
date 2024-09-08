import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem("token") !== null) {
    let userToken: any = { Token: localStorage.getItem("token") }
    let updatedReq = req.clone({
      setHeaders: userToken
    })
    return next(updatedReq);
  }
  else {
    return next(req)
  }
};
