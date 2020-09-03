import { Reducer, AnyAction } from 'redux';
import { LanguageState } from '../states/LanguageState';
import { ActionType } from '../Actions';

export const languageReducer: Reducer<LanguageState> = (
    state = new LanguageState(),
    action: AnyAction
): LanguageState => {
    switch (action.type) {
        case ActionType.LanguageChanged:
            return {
                ...state,
                currentLanguage: action.payload,
            };
        case ActionType.LanguageList:
            return {
                ...state,
                languages: action.payload,
            };
        default:
            return state;
    }
};
