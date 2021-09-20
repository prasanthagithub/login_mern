import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  submitMessage: String;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    //this.submitMessage = "Logged Out!!";
    this.router.navigate(['/login']);
  }
}
