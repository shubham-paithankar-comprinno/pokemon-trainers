import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loggedIn$ = false

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(() => {})
    this.loggedIn$ = JSON.parse((sessionStorage.getItem("isLoggedIn") as string)) ? JSON.parse((sessionStorage.getItem("isLoggedIn") as string)) : false
    if (this.loggedIn$) {
      this.router.navigateByUrl('/catalogue')
    }
  }
}
