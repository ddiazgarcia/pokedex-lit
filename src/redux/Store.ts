import { createStore, combineReducers, Store } from 'redux';
import { DataState } from './states/DataState';
import { pokemonReducer } from './reducers/PokemonReducer';
import { LanguageState } from './states/LanguageState';
import { languageReducer } from './reducers/LanguageReducer';

export interface AppState {
    pokemon: DataState;
    language: LanguageState;
}

//export type CombinedState = typeof combinedReducer;

export const store: Store<AppState> = createStore(
    combineReducers<AppState>({
        pokemon: pokemonReducer,
        language: languageReducer,
    })
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
