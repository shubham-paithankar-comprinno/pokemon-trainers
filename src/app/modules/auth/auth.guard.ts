import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  loadable = false

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
