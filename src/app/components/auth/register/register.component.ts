import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
    imports: [
        NavbarComponent,
        FormsModule
    ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    address: '',
    city: '',
    points: 0
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(response => {
      this.router.navigate(['/login']);
    });
  }
}
