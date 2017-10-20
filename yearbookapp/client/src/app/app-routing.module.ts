import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {AuthGuard} from './guards/auth.guard';
import {NotauthGuard} from './guards/notauth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotauthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotauthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    canActivate: [NotauthGuard]

  },
  {
    path: ':indexnumber',
    component: MessagesComponent
  },
  {
    path: '**',
    component: WelcomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [CommonModule]
})
export class AppRoutingModule {}
