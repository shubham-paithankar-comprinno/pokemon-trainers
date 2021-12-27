import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  loadable = false

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): boolean {
    this.loadable = this.authService.loggedIn$.value
    if (this.loadable) {
      return true
    } else {
      alert('You have to log in first')
      this.router.navigateByUrl('/')
      return false
    }
  }
}
