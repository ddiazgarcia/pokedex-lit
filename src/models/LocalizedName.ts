import { NamedResource } from './NamedResource';

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
    language: NamedResource;
}

export type LocalizedName = Localized & Name;
