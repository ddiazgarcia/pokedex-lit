import { ActionType } from '../Actions';
import { AnyAction, Reducer } from 'redux';
import { DataState } from '../states/DataState';

export const pokemonReducer: Reducer<DataState, AnyAction> = (
    state: DataState = DataState.initial(),
    action: AnyAction
): DataState => {
    const { list, entityType, item } = action.payload || {};
    switch (action.type) {
        case ActionType.InitialLoad:
            return new DataState(
                action.payload.entityMap,
                action.payload.listMap
            );
        case ActionType.ListInitial:
            return new DataState(state.entityMap, {
                ...state.listMap,
                [entityType]: list,
            });
        case ActionType.ListMore:
            return new DataState(state.entityMap, {
                ...state.listMap,
                [entityType]: [...state.getList(entityType), ...list],
            });
        case ActionType.Item:
            return new DataState(
                {
                    ...state.entityMap,
                    [entityType]: {
                        ...state.entityMap[entityType],
                        [item.name]: item,
                    },
                },
                state.listMap
            );
        default:
            return state;
    }
};
