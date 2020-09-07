import { NamedResource } from './NamedResource';
import { Generation, Pokedex, VersionGroup, Version } from './Games';
import { Pokemon } from './Pokemon';
export interface Location extends NamedResource {
    region: NamedResource;
    game_indices: {
        game_index: number;
        generation: Generation;
    };
    areas: LocationArea[];
}

export interface LocationArea extends NamedResource {
    game_index: number;
    encounter_method_rates: {
        encounter_method: NamedResource;
        version_details: {
            rate: number;
            version: Version;
        };
    };
    location: Location;
    pokemon_encounters: {
        pokemon: Pokemon;
        version_details: {
            version: NamedResource;
            max_chance: number;
            encounter_details: any;
        };
    };
}

export interface Region extends NamedResource {
    locations: Location[];
    main_generation: Generation;
    pokedexes: Pokedex[];
    version_groups: VersionGroup[];
}
