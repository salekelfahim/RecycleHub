import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    NavbarComponent,
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(users => {
      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        this.authService.redirectBasedOnRole(user);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
