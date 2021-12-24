import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PokemonService } from 'src/app/modules/catalogue/services/pokemon.service';

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

interface TrainerObject {
  username: string,
  pokemon: string[],
  id: number
}


@Component({
  selector: 'app-trainer-pokemon',
  templateUrl: './trainer-pokemon.component.html',
  styleUrls: ['./trainer-pokemon.component.scss']
})
export class TrainerPokemonComponent implements OnInit {

  pokemonData: Array<PokemonData> = []
  currentUser: TrainerObject = JSON.parse(sessionStorage.getItem("currentUser") as string)

  constructor(private authService: AuthService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonData = this.pokemonService.getTrainerPokemonData(this.currentUser.pokemon)
  }

  releasePokemon(pokemon: string) {
    let trainer = this.currentUser
    if (!trainer) {
      return this.authService.logOutUser()
    }

    if (trainer.pokemon.length === 1) {
      alert('You must have atleast 1 pokemon in your party.')
      return
    }

    if (trainer.pokemon.includes(pokemon)) {
      // console.log(`pokemon present in the party`)
      this.pokemonService.removePokemonFromUser(pokemon, trainer).subscribe(value => {
        sessionStorage.setItem("currentUser", JSON.stringify(value))
        this.pokemonData = this.pokemonService.getTrainerPokemonData(this.currentUser.pokemon)
      })
    }
  }
}
