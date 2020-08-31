import { NamedResource } from '../models/NamedResource';
import { ActionType } from './Actions';
import { AnyAction } from 'redux';
import { EntityType } from '../models/EntityType';
export class PokemonState {
    public constructor(
        public entityMap: Map<EntityType, Map<string, unknown>>,
        public listMap: Map<EntityType, Array<NamedResource>>
    ) {
        this.entityMap = entityMap;
        this.listMap = listMap;
    }

    getList(type: EntityType): Array<NamedResource> {
        return this.listMap.get(type) || new Array<NamedResource>();
    }

    getEntity(type: EntityType, url: string): unknown {
        return this.entityMap.get(type)?.get(url);
    }
    // pokemonList: NamedResource[] = [];
}

const cloneListMapAndAdd = <K, V>(
    oldMap: Map<K, Array<V>>,
    newKey: K,
    newValue: V[]
): Map<K, Array<V>> => {
    const mapToReturn = new Map(oldMap);
    mapToReturn.set(newKey, newValue);
    return mapToReturn;
};

const cloneDoubleMapAndAdd = <K1, K2, V>(
    oldMap: Map<K1, Map<K2, V>>,
    key1: K1,
    key2: K2,
    value: V
): Map<K1, Map<K2, V>> => {
    const mapToReturn = new Map(oldMap);
    if (!oldMap.has(key1)) {
        mapToReturn.set(key1, new Map());
    } else {
        const subMapCopy = new Map(oldMap.get(key1) || new Map());
        mapToReturn.set(key1, subMapCopy);
    }

    mapToReturn.get(key1)?.set(key2, value);
    return mapToReturn;
};

export const reducer = (
    state: PokemonState = new PokemonState(new Map(), new Map()),
    action: AnyAction
): PokemonState => {
    const { list, entityType, item } = action.payload || {};
    switch (action.type) {
        case ActionType.ListInitial:
            return new PokemonState(
                state.entityMap,
                cloneListMapAndAdd(state.listMap, entityType, list)
            );
        case ActionType.ListMore:
            return new PokemonState(
                state.entityMap,
                cloneListMapAndAdd(state.listMap, entityType, [
                    ...state.getList(entityType),
                    ...list,
                ])
            );
        case ActionType.Item:
            return new PokemonState(
                cloneDoubleMapAndAdd(
                    state.entityMap,
                    entityType,
                    item.url,
                    item
                ),
                state.listMap
            );
        default:
            return state;
    }
};
