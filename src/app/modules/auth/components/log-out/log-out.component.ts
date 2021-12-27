import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {

  constructor(private authService: AuthService, private router: Router) {
    //Log out user on coming to this route
    this.authService.logOutUser()
    this.router.navigateByUrl('/')
  }
  
}
