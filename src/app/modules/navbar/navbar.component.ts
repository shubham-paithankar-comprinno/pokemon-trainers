import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() brandImage = ''

  isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn") as string)

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(value => {
      this.isLoggedIn = value
    })
  }

}
