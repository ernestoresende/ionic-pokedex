import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0
  pokemon = []
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll

  // Injects the pokemon.service as a private variable
  constructor(private pokeService: PokemonService) {}

  // Calls for the loadPokemon function OnInit
  ngOnInit() {
    this.loadPokemon()
  }

  // Gets Pokemon data from the API and logs it to the console
  loadPokemon(loadMore = false, event?) {
    // Handles the offset that triggers more itens to render in the infinite scroll event
    if (loadMore) {
      this.offset += 25
    }

    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('result: ', res)
      this.pokemon = [...this.pokemon, ...res]

      if (event) {
        event.target.complete();
      }

      // Disables the infinte scroll after reaching a certain threshold
      if (this.offset == 125) {
        this.infinite.disabled = true
      }
    })
  }
}
