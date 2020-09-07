import { NamedResource } from './NamedResource';
export interface Language extends NamedResource {
    iso3166: string;
    iso639: string;
    official: boolean;
}
