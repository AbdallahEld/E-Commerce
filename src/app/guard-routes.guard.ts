import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthonService } from './authon.service';

export const guardRoutesGuard: CanActivateFn = (route, state) => {
  let _AuthonService = inject(AuthonService)
  let _Router = inject(Router)
  if (_AuthonService.isLogin.value) {
    return true
  } else {
    _Router.navigate(['/login'])
    return false
  }
};
