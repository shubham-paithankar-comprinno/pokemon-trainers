import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { TrainerPokemonComponent } from './components/trainer-pokemon/trainer-pokemon.component';


@NgModule({
  declarations: [
    TrainerComponent,
    TrainerProfileComponent,
    TrainerPokemonComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule
  ]
})
export class TrainerModule { }
