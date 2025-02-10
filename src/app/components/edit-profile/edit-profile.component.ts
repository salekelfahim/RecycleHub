// edit-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  user: any = {
    email: '',
    fullName: '',
    address: '',
    phone: '',
    dateOfBirth: '',
    profileImage: ''
  };
  profileImage: string = '';

  constructor(
      private http: HttpClient,
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.http.get(`http://localhost:3000/users/${user.id}`).subscribe(
          (userData: any) => {
            this.user = userData;
            this.profileImage = this.user.profileImage || '';
          },
          (error) => {
            console.error('Error loading user:', error);
            // Handle error appropriately
          }
      );
    }
  }

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileImage = await this.fileToBase64(file);
      this.user.profileImage = this.profileImage;
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  saveChanges() {
    const userId = this.user.id;
    const updatedUser = { ...this.user, profileImage: this.profileImage };

    this.http.patch(`http://localhost:3000/users/${userId}`, updatedUser).subscribe(
        () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Error updating profile. Please try again.');
        }
    );
  }

  cancelEdit() {
    this.router.navigate(['/profile']);
  }
}
