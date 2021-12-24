import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface User {
  username: string
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private authService: AuthService, private router: Router) { }

  get username() {
    return this.loginForm.controls['username']
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) return

    let localUserData = JSON.parse(localStorage.getItem("users") as string)

    let localUser = localUserData.filter((user: { username: string }) => user.username === this.username.value)

    if (!localUser) {
      alert('User does not exist')
      return
    } 

    return this.authService.logInUser(this.username.value).subscribe({
      next: value => {
        sessionStorage.setItem("isLoggedIn", JSON.stringify(this.authService.loggedIn$.value))
        sessionStorage.setItem("currentUser", JSON.stringify(this.authService.currentUser))
        this.router.navigateByUrl('/catalogue')
      },
      error: err => {
        console.log(err)
      }
    }) 
  }
}
