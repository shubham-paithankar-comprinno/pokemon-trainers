import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs';

interface PokemonObject {
  name: string,
  url: string
}

interface TrainerObject {
  username: string,
  pokemon: string[],
  id: number
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

  apiURL = `https://pokemon-noroff-api.herokuapp.com`
  API_Key = `1XXwWjA3fe1LvasnV3ilB82ffOTJwzd2Eh0Ngsbbq9sj95g3s9K0lBd5S4gtpaBY`

  constructor(private httpClient: HttpClient) { }

  getRandomPokemon() {
    let randomPokemon = JSON.parse(sessionStorage.getItem("randomPokemon") as string)
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
  
  addPokemonToUser(mon: string) {
    let { id="", pokemon=[], username="" }  = JSON.parse(sessionStorage.getItem("currentUser") as string)
    pokemon.push(mon)

    return this.httpClient.patch<TrainerObject>(`${this.apiURL}/trainers/${id}`, {
      id,
      username,
      pokemon
    }, {
      headers: {
        'X-API-Key': this.API_Key
      }
    })
  }
}
