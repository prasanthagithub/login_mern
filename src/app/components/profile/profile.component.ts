import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  userData: any;

  constructor(
    private authService: AuthService,
    private router: Router) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }

  ngOnInit(): void {
    this.authService.getProfile(this.userData.id).subscribe(profile =>{
      this.user = profile["user"];
    },
    err =>{
      //this.router.navigate(['/login']);
      return false;
    });
  }

}
