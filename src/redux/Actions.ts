import { AnyAction } from 'redux';
import { NamedResource } from '../models/NamedResource';
import { EntityType } from '../models/EntityType';
import { Language } from '../models/Language';
import { ListMap, EntityMap } from './states/DataState';
import { PokemonSpecie } from '../models/Pokemon';
import { Generation } from '../models/Games';

export enum ActionType {
    InitialLoad = 'InitialLoad',
    PokemonStart = 'PokemonStart',
    PokemonSuccess = 'PokemonSuccess',
    ListInitial = 'ListInitial',
    ListMore = 'ListMore',
    Item = 'Item',
    LanguageList = 'LanguageList',
    LanguageChanged = 'LanguageChanged',
    GenerationChanged = 'GenerationChanged',
    PokemonListStart = 'PokemonListStart',
    PokemonListSuccess = 'PokemonListSuccess',
    PokemonChanged = 'PokemonChanged',
}

export interface Action extends AnyAction {
    payload: unknown;
    error?: Error;
}

export const initialLoad = (listMap: ListMap, entityMap: EntityMap) => {
    return {
        type: ActionType.InitialLoad,
        payload: {
            listMap,
            entityMap,
        },
    };
};

export const initialList = (
    entityList: NamedResource[],
    entityType: EntityType
): AnyAction => {
    return {
        type: ActionType.ListInitial,
        payload: {
            entityType,
            list: entityList,
        },
    };
};

export const moreList = (
    entityList: NamedResource[],
    entityType: EntityType
): AnyAction => {
    return {
        type: ActionType.ListInitial,
        payload: {
            entityType,
            list: entityList,
        },
    };
};

export const item = <T>(item: T, entityType: EntityType): AnyAction => {
    return {
        type: ActionType.Item,
        payload: {
            entityType,
            item,
        },
    };
};

export const changeLanguage = (languageCode: string): AnyAction => {
    return {
        type: ActionType.LanguageChanged,
        payload: languageCode,
    };
};

export const languageList = (languages: Language[]): AnyAction => {
    return {
        type: ActionType.LanguageList,
        payload: languages,
    };
};

export const selectGeneration = (generation?: Generation): AnyAction => {
    return {
        type: ActionType.GenerationChanged,
        payload: generation,
    };
};

export const pokemonStart = (): AnyAction => {
    return {
        type: ActionType.PokemonStart,
    };
};

export const pokemonSuccess = (pokemon: PokemonSpecie): AnyAction => {
    return {
        type: ActionType.PokemonSuccess,
        payload: pokemon,
    };
};

export const pokemonListStart = (): AnyAction => {
    return {
        type: ActionType.PokemonListStart,
    };
};

export const pokemonListSuccess = (pokemonList: PokemonSpecie[]): AnyAction => {
    return {
        type: ActionType.PokemonListSuccess,
        payload: pokemonList,
    };
};
