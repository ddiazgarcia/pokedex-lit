import { createStore, combineReducers, Store } from 'redux';
import { DataState } from './states/DataState';
import { pokemonReducer } from './reducers/PokemonReducer';
import { LanguageState } from './states/LanguageState';
import { languageReducer } from './reducers/LanguageReducer';
import { SelectionState } from './states/SelectionState';
import { selectionReducer } from './reducers/SelectionReducer';

export interface AppState {
    pokemon: DataState;
    language: LanguageState;
    selection: SelectionState;
}

export const store: Store<AppState> = createStore(
    combineReducers<AppState>({
        pokemon: pokemonReducer,
        language: languageReducer,
        selection: selectionReducer,
    })
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
