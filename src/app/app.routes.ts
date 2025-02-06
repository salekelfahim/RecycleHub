import { Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {
  ParticulierDashboardComponent
} from "./components/particulier/particulier-dashboard/particulier-dashboard.component";
import {MyPostsComponent} from "./components/particulier/my-posts/my-posts.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'RecycleHub - Transform Your Waste into Rewards'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'RecycleHub - Register'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'RecycleHub - Login'
  },
  {
    path: 'dashboard',
    component: ParticulierDashboardComponent,
    children: [
      { path: 'posts', component: MyPostsComponent },
    ]
  },
];
