import { Language } from './Language';

type Name = {
    [name in
        | 'name'
        | 'description'
        | 'genus'
        | 'flavor_text'
        | 'awesome_name'
        | 'effect']: string;
};

interface Localized {
    language: Language;
}

export type LocalizedName = Localized & Name;

export type Localizations = {
    [langCode: string]: string;
};
