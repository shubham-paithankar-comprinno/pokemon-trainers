import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface trainerResponse {
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

  constructor(private httpClient: HttpClient) { }

  registerUser(username: string) {
    return this.httpClient.post<trainerResponse>(`${this.apiURL}/trainers?`, {
      username,
      pokemon: []
    }, {
      headers: {
        'X-API-Key': this.API_Key
      }
    })
  }

  getUsersFromAPI () {
    return this.httpClient.get(`${this.apiURL}/trainers?`)
  }
}
