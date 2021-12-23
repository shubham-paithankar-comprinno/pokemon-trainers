import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    //Gives error in Dev Mode 
    this.authService.loggedIn$.next(false)
    sessionStorage.setItem("isLoggedIn", 'false')
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
