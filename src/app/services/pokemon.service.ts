import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // Base URL's for the Pokedex API
  baseUrl = 'https://pokeapi.co/api/v2'
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'

  // Inject the HTTP client to make API calls
  constructor(private http: HttpClient) {
  }

  // Function to get Pokemon information from the API
  getPokemon (offset = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      // Using a pipe to format the data that comes from the Pokedex API into a more readable format
      map(result => {
        return result['results']
      }),
      map(pokemons => {
        return pokemons.map((poke, index) => {
          poke.image = this.getPokeImage(index + offset + 1)
          poke.pokeIndex = offset + index + 1
          return poke
        })
      })
    )
  }

  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`
  }

  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map (pokemon => {
        pokemon['image'] = this.getPokeImage(pokemon['id'])
        pokemon['pokeIndex'] = pokemon['id']
        return pokemon
      })
    )
  }
}
