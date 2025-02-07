import { Component } from '@angular/core';
import {NavbarDashboardComponent} from "../../layout/navbar-dashboard/navbar-dashboard.component";
import {RouterOutlet} from "@angular/router";
import {SidebarCoComponent} from "../../layout/sidebar-co/sidebar-co.component";

@Component({
  selector: 'app-collector-dashboard',
  standalone: true,
  imports: [
    NavbarDashboardComponent,
    RouterOutlet,
    SidebarCoComponent
  ],
  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.css'
})
export class CollectorDashboardComponent {

}
