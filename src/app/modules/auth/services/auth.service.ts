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
      }
    }).pipe(
      tap((value) => {
        this.currentUser = value[0]
        this.loggedIn$.next(true)
      })
    )
  }

  logOutUser() {
    this.loggedIn$.next(false)
    //Remove User and set logged in to false
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
      }
    }).pipe(
      tap(() => {
        this.loggedIn$.next(false)
        sessionStorage.setItem("isLoggedIn", JSON.stringify(this.loggedIn$.value))
      })
    )
  }


  getUsers() {
    let localData: { username: string }[] = []
    return this.httpClient.get<TrainerResponse[]>(`${this.apiURL}/trainers`)
    .pipe(
      tap(trainerArray => {
        trainerArray.forEach(trainer => {
          localData.push({ username: trainer.username })
        })
        localStorage.setItem("users", JSON.stringify(localData))
      })
    )
  }

  checkAuthStatus() {
    return JSON.parse(sessionStorage.getItem("isLoggedIn") as string)
  }

}
