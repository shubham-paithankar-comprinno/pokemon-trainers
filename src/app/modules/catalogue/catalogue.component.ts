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

  constructor(private pokemonService: PokemonService) {
    
  }

  ngOnInit(): void {
    //Generate pokemon on load
    return this.onGenerate()
  }

  //Generate random Pokemon 
  onGenerate() {
    this.pokemonService.getRandomPokemon().subscribe((value: any) => {
      this.randomPokemon = value
      //Get pokemon data for randmly generated pokemon
      this.pokemonData = this.pokemonService.getPokemonData(this.randomPokemon)
      //Check if trainer has any of the randomly generated pokemon
      this.hasPokemon = this.pokemonService.trainerHasPokemon(this.trainer.pokemon, this.randomPokemon)
    })
  }
}
