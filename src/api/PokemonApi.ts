import { store } from '../redux/Store';
import { EntityType } from '../models/EntityType';
import { BaseApi } from './WebApi';
import { PageResult } from '../models/PageResult';
import { initialList, item } from '../redux/Actions';
import { NamedResource } from '../models/NamedResource';
import {
    Pokemon,
    PokemonSpecie,
    PokemonColor,
    PokemonShape,
    PokemonType,
} from '../models/Pokemon';
import { DataState } from '../redux/states/DataState';
export class PokemonApi {
    public static async getPokemonSpeciesList(): Promise<void> {
        // Search if redux contains a list.
        const state: DataState = store.getState().pokemon;

        let currentList: NamedResource[] = state.getList(
            EntityType.POKEMON_SPECIES
        );

        if (!currentList.length) {
            const response: PageResult = await BaseApi.findAll(
                EntityType.POKEMON_SPECIES,
                0,
                80
            );
            currentList = response.results;
            store.dispatch(
                initialList(currentList, EntityType.POKEMON_SPECIES)
            );
        }
        await Promise.all(
            currentList.map(res =>
                PokemonApi.getPokemonSpecie(res, [
                    EntityType.POKEMON,
                    EntityType.POKEMON_TYPE,
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
                ])
            )
        );
        //LocalStorageApi.saveListMap(store.getState().pokemon.listMap);
        //LocalStorageApi.saveEntityMap(store.getState().pokemon.entityMap);
    }

    public static async getPokemonSpecie(
        resource: NamedResource,
        dependencies: EntityType[] = []
    ): Promise<PokemonSpecie> {
        try {
            const specie = await PokemonApi.getItem<PokemonSpecie>(
                resource,
                EntityType.POKEMON_SPECIES
            );

            const loadAll = dependencies.length === 0;

            if (loadAll || dependencies.includes(EntityType.POKEMON)) {
                await Promise.all(
                    specie.varieties.map(async variety => {
                        const pokemon = await PokemonApi.getPokemon(
                            variety.pokemon,
                            dependencies
                        );
                        variety.pokemon = pokemon;
                    })
                );
            }
            if (loadAll || dependencies.includes(EntityType.POKEMON_COLOR)) {
                const color = await PokemonApi.getItem<PokemonColor>(
                    specie.color,
                    EntityType.POKEMON_COLOR
                );
                specie.color = color;
            }
            if (loadAll || dependencies.includes(EntityType.POKEMON_SHAPE)) {
                const shape = await PokemonApi.getItem<PokemonShape>(
                    specie.shape,
                    EntityType.POKEMON_SHAPE
                );
                specie.shape = shape;
            }
            if (
                loadAll ||
                dependencies.includes(EntityType.POKEMON_GROWTH_RATE)
            ) {
                specie.growth_rate = await PokemonApi.getItem<NamedResource>(
                    specie.growth_rate,
                    EntityType.POKEMON_GROWTH_RATE
                );
            }
            return specie;
        } catch (err) {
            console.log(err);
            return resource as PokemonSpecie;
        }
    }

    public static async getPokemon(
        resource: NamedResource,
        dependencies: EntityType[] = []
    ): Promise<Pokemon> {
        const pokemon = await PokemonApi.getItem<Pokemon>(
            resource,
            EntityType.POKEMON
        );
        const loadAll = dependencies.length === 0;
        if (loadAll || dependencies.includes(EntityType.POKEMON_TYPE)) {
            await Promise.all(
                pokemon.types.map(async t => {
                    const type = await PokemonApi.getItem<PokemonType>(
                        t.type,
                        EntityType.POKEMON_TYPE
                    );
                    t.type = type;
                })
            );
        }
        return pokemon;
    }

    private static async getItem<T extends NamedResource>(
        resource: NamedResource,
        type: EntityType
    ): Promise<T> {
        // 1st attempt: get from redux
        const state: DataState = store.getState().pokemon;
        let itemResult: T = state.getEntity(type, resource.name) as T;
        if (!itemResult) {
            // 2nd attempt: get from localstorage
            //itemResult = LocalStorageApi.getEntity(type, resource.name) as T;
            //if (!itemResult) {
            // 3rd attempt: get from database
            itemResult = await BaseApi.get(resource.url);
            itemResult.url = resource.url;
            //LocalStorageApi.saveEntity(type, itemResult);
            //}
            store.dispatch(item(itemResult, type));
        }
        return itemResult as T;
    }
}
