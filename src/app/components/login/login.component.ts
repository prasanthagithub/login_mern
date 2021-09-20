import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  submitMessage: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if(this.authService.isAuthenticated())
    {
      this.router.navigate(['/dashboard']);
    }
   }

  ngOnInit(): void {}

  // For Login
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe( data =>{
      if(data.status == 'Success') {
        this.submitMessage = "success";
        this.authService.storeUserData(data.token, data.Data)
        this.router.navigate(['/dashboard']);
      }
      else {
        this.submitMessage = "error";
        this.router.navigate(['/login']);
      }
    });
  }

  // Navigate to Register
  register() {
    this.router.navigate(['/register']);
  }
}
