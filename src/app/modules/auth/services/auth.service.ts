import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface TrainerResponse {
  username: string,
  id: number,
  pokemon: []
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiURL = `https://pokemon-noroff-api.herokuapp.com`
  API_Key = `1XXwWjA3fe1LvasnV3ilB82ffOTJwzd2Eh0Ngsbbq9sj95g3s9K0lBd5S4gtpaBY`

  currentUser?: TrainerResponse

  loggedIn$ = new BehaviorSubject(JSON.parse(sessionStorage.getItem("isLoggedIn") as string) ? JSON.parse(sessionStorage.getItem("isLoggedIn") as string) : false)

  constructor(private httpClient: HttpClient) { }

  logInUser(username: string) {
    return this.httpClient.get<TrainerResponse[]>(`${this.apiURL}/trainers?`, {
      params: {
        username
      }, 
      withCredentials: true
    }).pipe(
      tap((value) => {
        this.currentUser = value[0]
        this.loggedIn$.next(true)
      })
    )
  }

  logOutUser() {
    this.loggedIn$.next(false)
    sessionStorage.setItem("isLoggedIn", JSON.stringify(this.loggedIn$.value))
    sessionStorage.removeItem("currentUser")
  }

  registerUser(username: string) {
    return this.httpClient.post<TrainerResponse>(`${this.apiURL}/trainers?`, {
      username,
      pokemon: []
    }, {
      headers: {
        'X-API-Key': this.API_Key
      },
      withCredentials: true
    }).pipe(
      tap(() => {
        this.loggedIn$.next(false)
      })
    )
  }


  getUsers() {
    //Get users from local Data
    let localUsers = JSON.parse(localStorage.getItem("users") as string) 
    //If localdata is empty add users to it from trainer api 
    if (!localUsers.length) {
      this.httpClient.get(`${this.apiURL}/trainers?`).subscribe({
        next: (value) => {
          localUsers = value
        }
      })
      localStorage.setItem("users", JSON.stringify(localUsers))
    }
    return localUsers
  }

  checkAuthStatus() {
    return JSON.parse(sessionStorage.getItem("isLoggedIn") as string)
  }

}
