import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.css'
})
export class NavbarDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
