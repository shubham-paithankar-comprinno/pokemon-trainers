import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+$/) // \w = [a-zA-z0-9_]
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

    let localUserData = JSON.parse(localStorage.getItem("users") as string)

    let localUser = localUserData.filter((user: { username: string }) => user.username === this.username.value)

    if (localUser.length) {
      alert('User already exist')
      return
    } 

    return this.authService.registerUser(this.username.value).subscribe({
      next: value => {
        let localUserData = JSON.parse(localStorage.getItem("users") as string)
        localUserData.push({ username: value.username })
        localStorage.setItem("users", JSON.stringify(localUserData))
        this.router.navigateByUrl('/')
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
