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
      alert('You are already logged In')
      this.router.navigateByUrl('/')
      return false
    } else {
      return true
    }
  }
}
