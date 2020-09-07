import { PokemonSpecie } from '../../models/Pokemon';
import { Generation } from '../../models/Games';
export class SelectionState {
    generation?: Generation;
    loadingPokemonList = false;
    pokemonList: PokemonSpecie[] = [];
    loadingPokemon = false;
    pokemon?: PokemonSpecie;
}
