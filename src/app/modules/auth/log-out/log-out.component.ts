import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.loggedIn$.next(false)
    this.router.navigateByUrl('/')
    return
  }

  // ngAfterViewInit() : void {
  // }

  // ngOnChange() : void {
  //   this.authService.loggedIn$.next(false)
  //   this.router.navigateByUrl('/')
  //   return
  // }

}
