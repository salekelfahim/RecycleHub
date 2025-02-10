import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getUser();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as Array<string>;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      if (user.role === 'particulier') {
        this.router.navigate(['/particulier/posts']);
      } else if (user.role === 'collector') {
        this.router.navigate(['/collector/collections']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }

    return true;
  }
}
