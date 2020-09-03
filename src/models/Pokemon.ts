import { NamedResource } from './NamedResource';
import { LocalizedName } from './LocalizedName';
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
            version: NamedResource;
            rarity: number;
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: NamedResource;
        version_group_details: {
            move_learn_method: NamedResource;
            version_group: NamedResource;
            level_learned_at: number;
        }[];
    }[];
    sprites: PokemonSprite;
    species: NamedResource;
    stats: {
        stat: NamedResource;
        effort: number;
        base_stat: number;
    }[];
    types: {
        slot: number;
        type: NamedResource;
    }[];
}

export interface PokemonSprite {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
}

export interface PokemonSpecie extends NamedResource {
    id: number;
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
        pokedex: NamedResource;
    }[];
    egg_groups: NamedResource[];
    color: NamedResource;
    shape: NamedResource;
    evolves_from_species: NamedResource;
    evolution_chain: NamedResource;
    habitat: NamedResource;
    generation: NamedResource;
    names: LocalizedName[];
    pal_park_encounters: {
        base_score: number;
        rate: number;
        area: NamedResource;
    }[];
    flavor_text_entries: LocalizedName[];
    form_descriptions: LocalizedName[];
    genera: LocalizedName[];
    varieties: {
        is_default: boolean;
        pokemon: NamedResource;
    }[];
}

export interface PokemonColor extends NamedResource {
    id: number;
    names: LocalizedName[];
}

export interface PokemonShape extends NamedResource {
    id: number;
    names: LocalizedName[];
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
    generation: NamedResource[];
    move_damage_class: NamedResource[];
    names: LocalizedName[];
    pokemon: {
        slot: number;
        pokemon: NamedResource;
    }[];
    moves: NamedResource[];
}
