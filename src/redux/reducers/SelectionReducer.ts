import { Reducer, AnyAction } from 'redux';
import { SelectionState } from '../states/SelectionState';
import { ActionType } from '../Actions';
export const selectionReducer: Reducer<SelectionState, AnyAction> = (
    state = new SelectionState(),
    action
) => {
    switch (action.type) {
        case ActionType.GenerationChanged:
            return {
                ...state,
                generation: action.payload,
            };
        case ActionType.PokemonListStart:
            return {
                ...state,
                loadingPokemonList: true,
                pokemonList: [],
            };
        case ActionType.PokemonListSuccess:
            return {
                ...state,
                loadingPokemonList: false,
                pokemonList: action.payload,
            };
        case ActionType.PokemonStart:
            return {
                ...state,
                loadingPokemon: true,
                pokemon: undefined,
            };
        case ActionType.PokemonSuccess:
            return {
                ...state,
                loadingPokemon: false,
                pokemon: action.payload,
            };
        case ActionType.PokemonRemove:
            return {
                ...state,
                pokemon: undefined,
            };
        default:
            return state;
    }
};
