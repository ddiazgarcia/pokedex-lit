import { LocalizedName } from '../models/LocalizedName';

export const DEFAULT_LANGUAGE = 'en';

const extractName = (obj: any): string => {
    const key = Object.keys(obj).find(key => key !== 'language') || 'name';
    return obj[key];
};

export const getName = (
    langCode: string,
    localizedNames: LocalizedName[]
): string => {
    const locName = localizedNames.find(
        lang => lang.language.name === langCode
    );
    if (locName) {
        return extractName(locName);
    }
    const defaultName = localizedNames.find(
        lang => lang.language.name === DEFAULT_LANGUAGE
    );
    return defaultName ? extractName(defaultName) : '';
};
