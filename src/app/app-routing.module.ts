import { NewMessageComponent } from './components/new-message/new-message.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGaurd } from './gaurds/auth.gaurd';
import { MessageViewComponent } from './message-view/message-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurd] },
  { path: 'newGroup', component: NewGroupComponent, canActivate: [AuthGaurd] },
  { path: 'newMessage', component: NewMessageComponent, canActivate: [AuthGaurd] },
  { path: 'groups/:groupId/editMessage/:id', component: NewMessageComponent, canActivate: [AuthGaurd] },
  { path: 'groups/:groupId/viewMessage/:id', component: MessageViewComponent, canActivate: [AuthGaurd] },
  { path: 'groups', component: DashboardComponent , canActivate: [AuthGaurd] },
  { path: 'groups/:groupId', component: DashboardComponent },
  { path: 'groups/:groupId/newMessage', component: NewMessageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }