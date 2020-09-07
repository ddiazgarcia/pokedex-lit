import { NamedResource } from './NamedResource';
import { LocalizedName } from './LocalizedName';
import { Version, VersionGroup, Pokedex, Generation } from './Games';
import { LocationArea } from './Locations';
export interface Pokemon extends NamedResource {
    id: number;
    base_experience: number;
    height: number;
    weight: number;
    is_default: boolean;
    order: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: NamedResource[];
    }[];
    forms: NamedResource[];
    //game_indices
    held_items: {
        item: NamedResource;
        version_details: {
            version: Version;
            rarity: number;
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: NamedResource;
        version_group_details: {
            move_learn_method: NamedResource;
            version_group: VersionGroup;
            level_learned_at: number;
        }[];
    }[];
    sprites: PokemonSprite;
    species: PokemonSpecie;
    stats: {
        stat: NamedResource;
        effort: number;
        base_stat: number;
    }[];
    types: {
        slot: number;
        type: PokemonType;
    }[];
    imageUrl: string;
}

export interface PokemonLight extends NamedResource {
    imageUrl: string;
}

export interface PokemonSprite {
    front_default: string;
    front_shiny?: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default: string;
    back_shiny?: string;
    back_female?: string;
    back_shiny_female?: string;
    other?: {
        dream_world: PokemonSprite;
        'official-artwork': PokemonSprite;
    };
    versions?: {
        [generation: string]: {
            [version: string]: PokemonSprite;
        };
    };
}

export interface PokemonSpecie extends NamedResource {
    //id: number;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_hapiness: number;
    is_baby: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: NamedResource;
    pokedex_numbers: {
        entry_number: number;
        pokedex: Pokedex;
    }[];
    egg_groups: NamedResource[];
    color: PokemonColor;
    shape: PokemonShape;
    evolves_from_species: PokemonSpecie;
    evolution_chain: NamedResource;
    habitat: NamedResource;
    generation: Generation;
    // names: LocalizedName[];
    pal_park_encounters: {
        base_score: number;
        rate: number;
        area: LocationArea;
    }[];
    flavor_text_entries: LocalizedName[];
    form_descriptions: LocalizedName[];
    genera: LocalizedName[];
    varieties: {
        is_default: boolean;
        pokemon: Pokemon;
    }[];
    imageUrl?: string;
}

export interface PokemonColor extends NamedResource {
    id: number;
    // : LocalizedName[];
}

export interface PokemonShape extends NamedResource {
    id: number;
    // names: LocalizedName[];
    awesome_names: LocalizedName[];
}

export interface PokemonType extends NamedResource {
    id: number;
    damage_relations: {
        no_damage_to: NamedResource[];
        half_damage_to: NamedResource[];
        double_damage_to: NamedResource[];
        no_damage_from: NamedResource[];
        half_damage_from: NamedResource[];
        double_damage_from: NamedResource[];
    };
    //game_indices:
    generation: Generation[];
    move_damage_class: NamedResource[];
    // names: LocalizedName[];
    pokemon: {
        slot: number;
        pokemon: NamedResource;
    }[];
    moves: NamedResource[];
}
