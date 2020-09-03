import { EntityType } from '../models/EntityType';
import { BaseApi } from './WebApi';
import { NamedResource } from '../models/NamedResource';
import { store } from '../redux/Store';
import { LocalStorageApi } from './LocalStorageApi';
import { initialLoad, initialList, item } from '../redux/Actions';
//import { EntityMap } from '../redux/states/DataState';
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
        ];

        const lMap = LocalStorageApi.getListMap();
        // const eMap = endpoints.reduce((eMap: EntityMap, type: EntityType) => {
        //     eMap[type] = LocalStorageApi.getEntitiesByType(type);
        //     return eMap;
        // }, {} as EntityMap);
        const eMap = LocalStorageApi.getEntityMap();

        if (!!lMap && !!eMap) {
            store.dispatch(initialLoad(lMap, eMap));
        } else {
            await Promise.all(
                endpointsToLoad.map(async type => {
                    const response = await BaseApi.findAll(type, 0, 5000);
                    store.dispatch(initialList(response.results, type));
                    await Promise.all(
                        response.results.map(async result => {
                            const entity = await BaseApi.get<NamedResource>(
                                result.url
                            );
                            entity.url = result.url;
                            store.dispatch(item(entity, type));
                            return entity;
                        })
                    );
                    return response.results;
                })
            );

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
        await PokemonApi.getPokemonSpeciesList();
    }
}
