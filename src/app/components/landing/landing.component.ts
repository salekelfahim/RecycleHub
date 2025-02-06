import { Component } from '@angular/core';
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../layout/footer/footer.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent
  ],
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
}
