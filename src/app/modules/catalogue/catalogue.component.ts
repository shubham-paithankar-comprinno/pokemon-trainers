import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';


interface PokemonObject {
  name: string,
  url: string
}

interface TrainerObject {
  username: string,
  id: number,
  pokemon: string[]
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

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  randomPokemon: Array<PokemonObject> = []
  pokemonData: Array<PokemonData> = []
  hasPokemon: string[] = []

  trainer: TrainerObject = JSON.parse(sessionStorage.getItem("currentUser") as string)
  sessionRandomPokemon = JSON.parse(sessionStorage.getItem("randomPokemon") as string)

  constructor(private pokemonService: PokemonService) {
    
  }

  ngOnInit(): void {
    return this.onGenerate()
  }

  onGenerate() {
    this.pokemonService.getRandomPokemon().subscribe((value: any) => {
      this.randomPokemon = value
      this.pokemonData = this.pokemonService.getPokemonData(this.randomPokemon)
      this.hasPokemon = this.pokemonService.trainerHasPokemon(this.trainer.pokemon, this.sessionRandomPokemon)
    })
  }

  generateLocalPokemon() {
    let sessionRandomPokemon = JSON.parse(sessionStorage.getItem("randomPokemon") as string)
    this.pokemonData = this.pokemonService.getPokemonData(sessionRandomPokemon)
  }
}
