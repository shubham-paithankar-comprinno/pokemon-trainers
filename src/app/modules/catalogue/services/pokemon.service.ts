import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs';

interface PokemonObject {
  name: string,
  url: string
}

interface PokemonData {
  id: number,
  name: string,
  sprites: {
    front_default: string
  },
  types: [
    {
      type: {
        name: string
      }
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokeAPI = `https://pokeapi.co/api/v2/pokemon`

  constructor(private httpClient: HttpClient) { }

  getRandomPokemon() {
    const randomNumber = Math.floor(Math.random() * (750 - 1) + 1)
    return this.httpClient.get(`${this.pokeAPI}?`, {
      params: {
        limit: 10,
        offset: randomNumber
      }
    }).pipe(
      pluck('results') 
    )
  }

  getPokemonData(pokemonArray: PokemonObject[]) {
    let pokemonData: Array<PokemonData> = []
    pokemonArray.forEach((pokemon: PokemonObject) => {
      this.httpClient.get<PokemonData>(`${this.pokeAPI}/${pokemon.name}`)
      .pipe( 
        map((pokemonObject): PokemonData => {
          const { id=0, name='', sprites={ front_default:'' }, types=[{ type: { name:'' } }] } = pokemonObject
          return { id, name, sprites, types }
        })
      )
      .subscribe(value => {
        pokemonData.push(value)
      })
    })  
    return pokemonData
  }
}
