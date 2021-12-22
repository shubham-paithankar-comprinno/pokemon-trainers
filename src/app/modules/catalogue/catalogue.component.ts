import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  pokeAPI = `https://pokeapi.co/api/v2/pokemon?`

  constructor(private httpClient: HttpClient) {
    this.getRandomPokemon()
   }

  ngOnInit(): void {
  }

  getRandomPokemon() {
    const randomNumber = Math.floor(Math.random() * (750 - 1) + 1)
    this.httpClient.get(this.pokeAPI, {
      params: {
        limit: 10,
        offset: randomNumber
      }
    }).subscribe(value => {
      console.log(value)
    })
  }
}
