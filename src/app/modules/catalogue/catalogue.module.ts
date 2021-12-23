import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';

import { CatalogueComponent } from './catalogue.component';
import { PokemonCardsComponent } from './components/pokemon-cards/pokemon-cards.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    PokemonCardsComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule
  ],
  exports: [
    CatalogueComponent
  ]
})
export class CatalogueModule { }
