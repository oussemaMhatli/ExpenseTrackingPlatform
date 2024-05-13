import { CanActivateFn } from '@angular/router';

export const linkGuardGuard: CanActivateFn = (route, state) => {


  const  token = localStorage.getItem('access_token');
  if (token) return true;
  return false;
};
