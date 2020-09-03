import { NamedResource } from './NamedResource';
import { LocalizedName } from './LocalizedName';
export interface Language extends NamedResource {
    id: number;
    iso3166: string;
    iso639: string;
    names: LocalizedName[];
    official: boolean;
}
