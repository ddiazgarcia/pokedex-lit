import { LitElement, html, customElement, css, property } from 'lit-element';
import { EntityType } from '../models/EntityType';
import { NamedResource } from '../models/NamedResource';
import { connect } from 'pwa-helpers';
import { store } from '../redux/Store';
import { PokemonState } from '../redux/PokemonReducer';
import { PokemonApi } from '../api/PokemonApi';

@customElement('pokemon-list')
export class PokemonList extends connect(store)(LitElement) {
    public static styles = css`
        * {
            box-sizing: border-box;
        }
        .container {
            width: 100%;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 3vmin;
            display: flex;
            flex-wrap: wrap;
        }
        .container .item {
            padding: 5px;
            flex: 100%;
            max-width: 100%;
        }
        @media screen and (min-width: 600px) {
            .container .item {
                flex: 50%;
                max-width: 50%;
            }
        }

        @media only screen and (min-width: 992px) {
            .container .item {
                flex: 25%;
                max-width: 25%;
            }
        }
    `;

    public constructor() {
        super();
        this.pokemonList = [];
        this.loadList();
    }

    public stateChanged(state: PokemonState) {
        this.pokemonList = state.getList(EntityType.POKEMON_SPECIES);
    }

    private async loadList() {
        /*const response: PageResult = await BaseApi.findAll(
            EntityType.POKEMON,
            0,
            5000
        );
        this.pokemonList = response.results;*/
        PokemonApi.getPokemonList();
    }

    @property({ type: Array })
    public pokemonList: NamedResource[];

    render() {
        return html`
            <div class="container">
                ${this.pokemonList.map(
                    pokemon => html` <div class="item">${pokemon.name}</div> `
                )}
            </div>
        `;
    }
}
