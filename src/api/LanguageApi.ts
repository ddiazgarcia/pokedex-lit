import { BaseApi } from './WebApi';
import { EntityType } from '../models/EntityType';
import { Language } from '../models/Language';
import { store } from '../redux/Store';
import { languageList } from '../redux/Actions';
import { LocalizationUtils } from '../utils/LocalizationUtils';
import { LocalizedName } from '../models/LocalizedName';

export class LanguageApi {
    public static async getLanguages() {
        if (!store.getState().language.languages.length) {
            const result = await BaseApi.findAllFull<Language>(
                EntityType.LANGUAGE,
                0,
                5000
            );
            result.forEach(lang => {
                lang.names = LocalizationUtils.toLocalizations(
                    lang.names as LocalizedName[]
                );
            });
            store.dispatch(languageList(result));
        }
    }
}
