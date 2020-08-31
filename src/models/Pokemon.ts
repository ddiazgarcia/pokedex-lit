import { NamedResource } from './NamedResource';
export interface Pokemon extends NamedResource {
    id: number;
    height: number;
    weight: number;
}
