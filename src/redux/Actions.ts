import { AnyAction } from 'redux';
import { NamedResource } from '../models/NamedResource';
import { EntityType } from '../models/EntityType';
import { Language } from '../models/Language';
import { ListMap, EntityMap } from './states/DataState';

export enum ActionType {
    InitialLoad = 'InitialLoad',
    PokemonSuccess = 'PokemonSuccess',
    ListInitial = 'ListInitial',
    ListMore = 'ListMore',
    Item = 'Item',
    LanguageList = 'LanguageList',
    LanguageChanged = 'LanguageChanged',
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
