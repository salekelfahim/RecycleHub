import { Component } from '@angular/core';
import {NavbarDashboardComponent} from "../../layout/navbar-dashboard/navbar-dashboard.component";
import {RouterOutlet} from "@angular/router";
import {SideBarComponent} from "../side-bar/side-bar.component";

@Component({
  selector: 'app-particulier-dashboard',
  standalone: true,
  imports: [
    NavbarDashboardComponent,
    RouterOutlet,
    SideBarComponent
  ],
  templateUrl: './particulier-dashboard.component.html',
  styleUrl: './particulier-dashboard.component.css'
})
export class ParticulierDashboardComponent {

}
