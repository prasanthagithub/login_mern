import { AuthInterceptor } from './components/Interceptor/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGaurd } from './gaurds/auth.gaurd';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DisplayCardComponent } from './components/display-card/display-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftNavComponent } from './components/left-Nav/left-Nav.component';
import { GroupComponent } from './components/group/group.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MessageViewComponent } from './message-view/message-view.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { StripTagsPipe } from './pipes/strip-html.pipe';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    LeftNavComponent,
    DisplayCardComponent,
    FooterComponent,
    GroupComponent,
    NewGroupComponent,
    NewMessageComponent,
    MessageViewComponent,
    SanitizeHtmlPipe,
    StripTagsPipe
  ],
  exports: [  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    ToastrModule.forRoot()
  ],
  providers: [ AuthGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
