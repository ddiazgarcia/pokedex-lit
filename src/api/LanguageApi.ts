import { BaseApi } from './WebApi';
import { EntityType } from '../models/EntityType';
import { Language } from '../models/Language';
import { store } from '../redux/Store';
import { languageList } from '../redux/Actions';

export class LanguageApi {
    public static async getLanguages() {
        if (!store.getState().language.languages.length) {
            const result = await BaseApi.findAllFull<Language>(
                EntityType.LANGUAGE,
                0,
                5000
            );
            store.dispatch(languageList(result));
        }
    }
}
