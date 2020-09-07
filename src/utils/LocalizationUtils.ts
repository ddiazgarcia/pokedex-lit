import { LocalizedName, Localizations } from '../models/LocalizedName';
import { NamedResource } from '../models/NamedResource';

export const DEFAULT_LANGUAGE = 'en';

export class LocalizationUtils {
    public static extractName(obj: any): string {
        const key = Object.keys(obj).find(key => key !== 'language') || 'name';
        return obj[key] || '';
    }

    public static getName(
        langCode: string,
        entity: NamedResource | undefined,
        defaultNameIfNotFound = ''
    ) {
        if (!entity) {
            return defaultNameIfNotFound;
        }
        let locs: Localizations;
        if (Array.isArray(entity.names)) {
            locs = this.toLocalizations(entity.names);
        } else {
            locs = entity.names;
        }
        if (!locs) {
            return defaultNameIfNotFound;
        }
        return locs[langCode] || locs['en'] || defaultNameIfNotFound;
    }

    public static toLocalizations(
        localizedNames: LocalizedName[]
    ): Localizations {
        return localizedNames.reduce(
            (result: Localizations, localizedName: LocalizedName) => {
                result[localizedName.language.name] = this.extractName(
                    localizedName
                );
                return result;
            },
            {}
        );
    }
    /*
    public static getName(
        langCode: string,
        localizedNames: LocalizedName[]
    ): string {
        const locName = localizedNames.find(
            lang => lang.language.name === langCode
        );
        if (locName) {
            return this.extractName(locName);
        }
        const defaultName = localizedNames.find(
            lang => lang.language.name === DEFAULT_LANGUAGE
        );
        return defaultName ? this.extractName(defaultName) : '';
    }*/
}
