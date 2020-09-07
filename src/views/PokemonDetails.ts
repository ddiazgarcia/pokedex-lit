import { customElement, LitElement, property, css, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store, AppState } from '../redux/Store';
import { PokemonSpecie } from '../models/Pokemon';
import { LocalizationUtils } from '../utils/LocalizationUtils';

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

    public static styles = css``;

    public render() {
        return html`
            <div>
                ${LocalizationUtils.getName(
                    this.language,
                    this.selectedPokemon
                )}
            </div>
        `;
    }
}
