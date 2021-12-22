import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './modules/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn$ = false

  constructor(private authService: AuthService) {
  }
  
  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn$ = loggedIn
    })
    this.authService.checkAuthStatus()
  }
}