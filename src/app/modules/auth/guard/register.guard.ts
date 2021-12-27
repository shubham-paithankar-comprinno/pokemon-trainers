import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanLoad {

  loadable = false

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): boolean {
    this.loadable = this.authService.loggedIn$.value
    if (this.loadable) {
      alert('You are already logged In')
      this.router.navigateByUrl('/trainer')
      return false
    } else {
      return true
    }
  }
}
