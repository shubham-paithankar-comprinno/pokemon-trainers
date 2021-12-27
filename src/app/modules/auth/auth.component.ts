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
    //Call trainer api and store users object in localStorage
    this.authService.getUsers().subscribe(() => {}) 

    //Check whether user is logged in through observable in auth service
    this.authService.loggedIn$.subscribe((value: boolean) => {
      this.loggedIn$ = value
    })
    //If logged in redirect to catalogue page
    if (this.loggedIn$) {
      this.router.navigateByUrl('/catalogue')
    }
  }
}
