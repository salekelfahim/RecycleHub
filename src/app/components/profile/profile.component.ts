import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getUser();

    if (user && user.id) {
      this.userService.getUserData(user.id).subscribe(
          (data) => this.user = data,
          (error) => console.error('Error fetching user data', error)
      );
    } else {
      console.error('User ID not found');
    }
  }
}
