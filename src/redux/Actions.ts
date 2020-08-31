import { AnyAction } from 'redux';
import { NamedResource } from '../models/NamedResource';
import { EntityType } from '../models/EntityType';

export enum ActionType {
    PokemonSuccess = 'PokemonSuccess',
    ListInitial = 'ListInitial',
    ListMore = 'ListMore',
    Item = 'Item',
}

export interface Action extends AnyAction {
    payload: unknown;
    error?: Error;
}

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
