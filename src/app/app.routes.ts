import { Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {RegisterComponent} from "./components/auth/register/register.component";

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
];
