import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthenticationService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthenticationService,
    private router : Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url : string) : boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}