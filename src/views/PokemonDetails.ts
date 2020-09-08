import { customElement, LitElement, property, css, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store, AppState } from '../redux/Store';
import { PokemonSpecie } from '../models/Pokemon';
import { LocalizationUtils } from '../utils/LocalizationUtils';
import { pokemonRemove } from '../redux/Actions';

@customElement('pokemon-detail')
export class PokemonDetail extends connect(store)(LitElement) {
    @property({ type: Object, attribute: false })
    private selectedPokemon?: PokemonSpecie;
    @property({ type: String, attribute: false })
    private language = 'en';

    public stateChanged(state: AppState) {
        this.selectedPokemon = state.selection.pokemon;
        this.language = state.language.currentLanguage;
    }

    public static styles = css`
        .detail-container {
            padding: 20px;
        }
        .hidden {
            display: none;
        }
    `;

    public render() {
        if (!this.selectedPokemon) {
            return html`<div class="hidden"></div>`;
        }
        return html`
            <div class="detail-container">
                ${LocalizationUtils.getName(
                    this.language,
                    this.selectedPokemon
                )}
                <button @click=${() => store.dispatch(pokemonRemove())}>
                    Close
                </button>
            </div>
        `;
    }
}
