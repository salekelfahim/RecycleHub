import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { FormsModule } from "@angular/forms";
import Swal from 'sweetalert2';

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

        Swal.fire({
          title: 'Connexion réussie !',
          text: 'Vous allez être redirigé...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.authService.redirectBasedOnRole(user);
        });

      } else {
        Swal.fire({
          title: 'Erreur',
          text: 'Identifiants incorrects',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
