import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';


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

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  randomPokemon: Array<PokemonObject> = []
  pokemonData: Array<PokemonData> = []

  constructor(private pokemonService: PokemonService) {
    this.onGenerate()
  }

  ngOnInit(): void {
  }

  onGenerate() {
    this.pokemonService.getRandomPokemon().subscribe((value: any) => {
      this.randomPokemon = value
      this.pokemonData = this.pokemonService.getPokemonData(this.randomPokemon)
    })
  }
}
