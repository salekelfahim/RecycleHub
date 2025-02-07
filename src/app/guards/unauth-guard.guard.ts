import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      if (user.role === 'particulier') {
        this.router.navigate(['/particulier/posts']);
      } else if (user.role === 'collector') {
        this.router.navigate(['/collector/collections']);
      }
      return false;
    }
    return true;
  }
}
