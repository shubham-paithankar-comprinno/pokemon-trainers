import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
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
  @Input() hasPokemonArray: string[] = []

  trainer = JSON.parse(sessionStorage.getItem("currentUser") as string)

  constructor(private pokemonService: PokemonService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  catchPokemon(pokemon: string) {
    if (!this.trainer) {
      return this.authService.logOutUser()
    }

    if (this.trainer.pokemon.length === 6) {
      alert('You cant have more than 6 pokemon in your party.')
      return
    }

    if (this.trainer.pokemon.includes(pokemon)) {
      alert('You already have this pokemon in your party')
      return
    }

    this.pokemonService.addPokemonToUser(pokemon, this.trainer).subscribe(value => {
      sessionStorage.setItem("currentUser", JSON.stringify(value))
    })
  }

}
