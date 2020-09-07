import { LocalizedName, Localizations } from './LocalizedName';

export interface NamedResource {
    id: number;
    name: string;
    url: string;
    names: LocalizedName[] | Localizations;
}
