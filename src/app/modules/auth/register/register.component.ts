import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+$/)
    ])
  })

  constructor(private authService: AuthService, private router: Router) { }

  get username() {
    return this.registerForm.controls['username']
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.username.invalid) return

    let localUserData = this.authService.getUsers()

    let localUser = localUserData.filter((user: { username: any }) => user.username === this.username.value)

    if (localUser.length) {
      alert('Username is taken')
      return
    }

    return this.authService.registerUser(this.username.value)
    .subscribe({
      next: (value) => {
        localUserData.push({ username: value.username })
        localStorage.setItem("users", JSON.stringify(localUserData))
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
