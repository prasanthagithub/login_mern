import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'leftNav',
  templateUrl: './leftNav.component.html',
  styleUrls: ['./leftNav.component.css']
})
export class LeftNavComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onClick(){
    alert("hi");
  }
}