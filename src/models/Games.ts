import { LocalizedName } from './LocalizedName';
import { NamedResource } from './NamedResource';
import { Region } from './Locations';
import { PokemonSpecie, PokemonType } from './Pokemon';

export interface Generation extends NamedResource {
    abilities: NamedResource[];
    mainRegion: Region;
    moves: NamedResource[];
    pokemon_species: PokemonSpecie[];
    types: PokemonType[];
    version_groups: VersionGroup[];
}

export interface Pokedex extends NamedResource {
    is_main_series: boolean;
    descriptions: LocalizedName[];
    pokemon_entries: {
        entry_number: number;
        pokemon_species: PokemonSpecie;
    };
    region: Region;
    version_groups: VersionGroup[];
}

export interface Version extends NamedResource {
    version_group: VersionGroup;
}

export interface VersionGroup extends NamedResource {
    order: number;
    generation: Generation;
    move_learn_methods: NamedResource[];
    pokedexes: Pokedex[];
    regions: Region[];
    versions: Version[];
}
