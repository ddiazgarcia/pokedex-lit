import { EntityType } from '../models/EntityType';
import { BaseApi } from './WebApi';
import { store } from '../redux/Store';
import { LocalStorageApi } from './LocalStorageApi';
import {
    initialLoad,
    initialList,
    item,
    selectGeneration,
} from '../redux/Actions';
//import { EntityMap } from '../redux/states/DataState';
// import { PokemonApi } from './PokemonApi';
// import { PageResult } from '../models/PageResult';
// import { PokemonLight } from '../models/Pokemon';
// import { LocalizationUtils } from '../utils/LocalizationUtils';
// import { LocalizedName } from '../models/LocalizedName';
import { Generation } from '../models/Games';
import { PokemonApi } from './PokemonApi';
export class InitialLoad {
    public static async start(): Promise<void> {
        const endpointsToLoad: EntityType[] = [
            //EntityType.POKEMON,
            EntityType.POKEMON_COLOR,
            EntityType.POKEMON_SHAPE,
            //EntityType.POKEMON_SPECIES,
            EntityType.POKEMON_TYPE,
            //EntityType.POKEMON_ABILITY,
            EntityType.POKEMON_EGG_GROUP,
            //EntityType.POKEMON_FORM,
            EntityType.POKEMON_GENDER,
            EntityType.POKEMON_GROWTH_RATE,
            EntityType.POKEMON_HABITAT,
            EntityType.POKEMON_NATURE,
            EntityType.GENERATION,
            EntityType.POKEDEX,
            EntityType.REGION,
            EntityType.VERSION,
            EntityType.VERSION_GROUP,
        ];

        const lMap = LocalStorageApi.getListMap();
        const eMap = LocalStorageApi.getEntityMap();

        if (!!lMap && !!eMap) {
            store.dispatch(initialLoad(lMap, eMap));
        } else {
            // Generic endpoints
            await Promise.all(
                endpointsToLoad.map(async type => {
                    const response = await BaseApi.findAll(type, 0, 5000);
                    await Promise.all(
                        response.results.map(async result => {
                            const entity = await PokemonApi.getItem(
                                result,
                                type
                            );
                            entity.url = result.url;
                            store.dispatch(item(entity, type));
                            // Update light item
                            // const lightItem = response.results.find(
                            //     item => item.name === result.name
                            // );
                            // if (!!lightItem && !!entity.names) {
                            //     lightItem.names = LocalizationUtils.toLocalizations(
                            //         entity.names as LocalizedName[]
                            //     );
                            // }
                            return entity;
                        })
                    );
                    store.dispatch(initialList(response.results, type));
                    return response.results;
                })
            );
            //Pokemon list with names and sprites
            /*const pokemonListResponse: PageResult = await BaseApi.findAll(
                EntityType.POKEMON_SPECIES,
                0,
                5000
            );
            const pokemonSpecies = await Promise.all(
                pokemonListResponse.results.map(res =>
                    PokemonApi.getPokemonSpecie(res, [
                        EntityType.POKEMON,
                        /*EntityType.POKEMON_TYPE,
                        EntityType.POKEMON_COLOR,
                        EntityType.POKEMON_SHAPE,
                        EntityType.POKEMON_TYPE,
                        EntityType.POKEMON_ABILITY,
                        EntityType.POKEMON_EGG_GROUP,
                        EntityType.POKEMON_FORM,
                        EntityType.POKEMON_GENDER,
                        EntityType.POKEMON_GROWTH_RATE,
                        EntityType.POKEMON_HABITAT,
                        EntityType.POKEMON_NATURE,
                        EntityType.GENERATION,
                        EntityType.POKEDEX,
                        EntityType.REGION,
                        EntityType.VERSION,
                        EntityType.VERSION_GROUP,* /
                    ])
                )
            );
            const lightPokemonList: PokemonLight[] = pokemonSpecies.map(
                specie => {
                    const defaultPokemon = specie.varieties.find(
                        pokemon => pokemon.is_default
                    )!.pokemon;
                    return {
                        id: specie.id,
                        name: specie.name,
                        url: specie.url,
                        names: specie.names,
                        imageUrl:
                            defaultPokemon.sprites.other?.['official-artwork']
                                .front_default ||
                            defaultPokemon.sprites.front_default,
                    };
                }
            );

            store.dispatch(
                initialList(lightPokemonList, EntityType.POKEMON_SPECIES)
            );
                */
            const { entityMap, listMap } = store.getState().pokemon;

            // for (const currentType in endpoints) {
            //     for (let i = 0; i < globalThis.localStorage.length; i++) {
            //         const currentKey = globalThis.localStorage.key(i);
            //         if (
            //             currentKey ===
            //             `${LocalStorageApi.ENTITY_MAP_KEY}-${currentType}`
            //         ) {
            //             LocalStorageApi.saveEntitiesByType(
            //                 currentType as EntityType,
            //                 entityMap[currentType]
            //             );
            //         }
            //     }
            // }
            LocalStorageApi.saveEntityMap(entityMap);
            LocalStorageApi.saveListMap(listMap);
        }
        const generationI = store
            .getState()
            .pokemon.getEntity(
                EntityType.GENERATION,
                'generation-i'
            ) as Generation;
        store.dispatch(selectGeneration(generationI));
        await PokemonApi.getPokemonSpecies(generationI.pokemon_species);
    }
}
