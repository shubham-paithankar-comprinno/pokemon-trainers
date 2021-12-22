import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

    let localUserData = this.authService.getUsers()
    let localUser = localUserData.filter((user: { username: any }) => user.username === this.username.value)

    if (!localUser.length) {
      alert('User does not exists')
      return
    } 

    this.authService.logInUser(this.username.value).subscribe({
      next: value => {
        this.router.navigateByUrl('/catalogue')
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
