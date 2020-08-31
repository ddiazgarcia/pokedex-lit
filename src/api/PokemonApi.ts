import { store } from '../redux/Store';
import { EntityType } from '../models/EntityType';
import { PokemonState } from '../redux/PokemonReducer';
import { BaseApi } from './BaseApi';
import { PageResult } from '../models/PageResult';
import { initialList, item } from '../redux/Actions';
import { NamedResource } from '../models/NamedResource';
import { Pokemon } from '../models/Pokemon';
export class PokemonApi {
    public static async getPokemonList(): Promise<void> {
        // Search if redux contains a list.
        const state: PokemonState = store.getState();

        let currentList: NamedResource[] = state.getList(
            EntityType.POKEMON_SPECIES
        );

        if (!currentList.length) {
            const response: PageResult = await BaseApi.findAll(
                EntityType.POKEMON_SPECIES,
                0,
                40
            );
            currentList = await Promise.all(
                response.results.map(async (resource: NamedResource) => {
                    const itemResponse = await BaseApi.get<Pokemon>(
                        resource.url
                    );
                    return itemResponse;
                })
            );
            store.dispatch(
                initialList(currentList, EntityType.POKEMON_SPECIES)
            );
            currentList.map(pokemon =>
                store.dispatch(item(pokemon, EntityType.POKEMON_SPECIES))
            );
        }
    }
}
