import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

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
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss']
})
export class PokemonCardsComponent implements OnInit {

  @Input() pokemonData: PokemonData[] = []

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }

  catchPokemon(pokemon: string){
    this.pokemonService.addPokemonToUser(pokemon).subscribe(value => {
      sessionStorage.setItem("currentUser", JSON.stringify(value))
    })
  }

}
