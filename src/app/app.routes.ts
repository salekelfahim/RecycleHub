import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { UnauthGuard } from './guards/unauth-guard.guard';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ParticulierDashboardComponent } from './components/particulier/particulier-dashboard/particulier-dashboard.component';
import { MyPostsComponent } from './components/particulier/my-posts/my-posts.component';
import { AddPostComponent } from './components/particulier/add-post/add-post.component';
import { ExchangeComponent } from './components/particulier/exchange/exchange.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CollectorDashboardComponent } from './components/collector/collector-dashboard/collector-dashboard.component';
import { CollectionsComponent } from './components/collector/collections/collections.component';
import { MyCollectionsComponent } from './components/collector/my-collections/my-collections.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'RecycleHub - Transform Your Waste into Rewards',
    canActivate: [UnauthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'RecycleHub - Register',
    canActivate: [UnauthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'RecycleHub - Login',
    canActivate: [UnauthGuard]
  },
  {
    path: 'particulier',
    component: ParticulierDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['particulier'] },
    children: [
      { path: 'posts', component: MyPostsComponent },
      { path: 'add-post', component: AddPostComponent },
      { path: 'exchange', component: ExchangeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent }
    ]
  },
  {
    path: 'collector',
    component: CollectorDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['collector'] },
    children: [
      { path: 'collections', component: CollectionsComponent },
      { path: 'my-collections', component: MyCollectionsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
