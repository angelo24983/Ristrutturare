import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate() {
    if  ( this.authService.isLoggedIn() ) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  canActivateChild() {
    if  ( this.authService.isLoggedIn() ) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}