import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  loadable = false

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    this.loadable = JSON.parse(sessionStorage.getItem("isLoggedIn") as string)
    if (this.loadable) {
      return true
    } else {
      alert('You have to log in first')
      this.router.navigateByUrl('/')
      return false
    }
  }
}
