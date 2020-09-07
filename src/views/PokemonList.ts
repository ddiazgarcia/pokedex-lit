import { LitElement, html, customElement, css, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store, AppState } from '../redux/Store';
import '../components/PokemonListItem';
import { PokemonSpecie } from '../models/Pokemon';
import { pokemonStart, pokemonSuccess } from '../redux/Actions';
import { PokemonApi } from '../api/PokemonApi';

@customElement('pokemon-list')
export class PokemonList extends connect(store)(LitElement) {
    public static styles = css`
        * {
            box-sizing: border-box;
        }
        .container {
            width: 100%;
            font-family: Geneva, Verdana, Tahoma, sans-serif;
            font-size: 3vmin;
            display: flex;
            flex-wrap: wrap;
        }
        .container .item {
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

    @property({ type: Array, attribute: false })
    public pokemonList: PokemonSpecie[] = [];

    @property({ type: Object, attribute: false })
    public selectedPokemon?: PokemonSpecie;

    @property({ type: Boolean, attribute: false })
    public loading = false;

    public stateChanged(state: AppState) {
        this.loading = state.selection.loadingPokemonList;
        this.pokemonList = state.selection.pokemonList;
        this.selectedPokemon = state.selection.pokemon;
    }

    public async onPokemonSelected(pokemon: PokemonSpecie) {
        console.log(`Selected ${pokemon.name}`);
        store.dispatch(pokemonStart());
        const fullPokemon = await PokemonApi.getPokemonSpecie(pokemon);
        store.dispatch(pokemonSuccess(fullPokemon));
    }

    public disconnectedCallback() {
        console.log('Disconnect');
        super.disconnectedCallback();
    }

    render() {
        if (this.loading) {
            return html`<div class="container">Loading data...</div>`;
        }
        return html`
            <div class="container">
                ${this.pokemonList.map(
                    (pokemon, index) => html`
                        <pokemon-list-item
                            class="item"
                            .pokemon="${pokemon}"
                            index="${index}"
                            @click=${() => this.onPokemonSelected(pokemon)}
                        ></pokemon-list-item>
                    `
                    //<div class="item">${pokemon.name}</div>
                )}
            </div>
        `;
    }
}
