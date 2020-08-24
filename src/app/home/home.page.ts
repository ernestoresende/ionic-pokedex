import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0
  pokemon = []

  // Injects the pokemon.service as a private variable
  constructor(private pokeService: PokemonService) {}

  // Calls for the loadPokemon function OnInit
  ngOnInit() {
    this.loadPokemon()
  }

  // Gets Pokemon data from the API and logs it to the console
  loadPokemon() {
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('result: ', res)
      this.pokemon = res
    })
  }
}
