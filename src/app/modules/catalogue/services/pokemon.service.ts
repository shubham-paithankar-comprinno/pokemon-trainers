import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs';

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

  generateRandomPokemon() {
    const randomNumber = Math.floor(Math.random() * (750 - 1) + 1)
    return this.httpClient.get<PokemonObject[]>(`${this.pokeAPI}?`, {
      params: {
        limit: 10,
        offset: 10
      }
    }).pipe(
      pluck('results') 
    )
  }

  getRandomPokemon() {
    return this.generateRandomPokemon()
    .pipe(
      tap((randomPokemon: any) => {
        sessionStorage.setItem("randomPokemon", JSON.stringify(randomPokemon)) 
      })
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

  getTrainerPokemonData(pokemonArray: string[]) {
    let pokemonData: Array<PokemonData> = []
    pokemonArray.forEach(pokemon => {
      this.httpClient.get<PokemonData>(`${this.pokeAPI}/${pokemon}`)
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
  
  addPokemonToUser(mon: string, trainer: TrainerObject) {
    let { id="", pokemon=[], username="" }  = trainer

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

  removePokemonFromUser(mon: string, trainer: TrainerObject) {
    let { id="", pokemon=[], username="" }  = trainer
    pokemon = this.removeItem(pokemon, mon)

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

  trainerHasPokemon(trainerPokemon: string[], pokemonArray: PokemonObject[]) {
    let indexPokemon: string[] = []
    pokemonArray.forEach(mon => {
      trainerPokemon.forEach(pokemon => {
        if (pokemon === mon.name) {
          indexPokemon.push(mon.name)
        }
      })
    })
    return indexPokemon
  }

  removeItem(arr: any[], value: any) { 
    const index = arr.indexOf(value)
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr
  }
}
