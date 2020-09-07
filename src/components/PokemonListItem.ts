import { LitElement, property, html, css, customElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store, AppState } from '../redux/Store';
import { PokemonSpecie } from '../models/Pokemon';
import { LocalizationUtils } from '../utils/LocalizationUtils';
import './Chip';

@customElement('pokemon-list-item')
export class PokemonListItem extends connect(store)(LitElement) {
    @property({ type: Object })
    public pokemon?: PokemonSpecie;

    @property({ type: Number })
    public index = 0;

    @property({ type: String, attribute: false })
    private currentLanguage = 'en';

    @property({ type: Object, attribute: false })
    public selectedPokemon?: PokemonSpecie;

    public stateChanged(state: AppState) {
        this.currentLanguage = state.language.currentLanguage;
        this.selectedPokemon = state.selection.pokemon;
    }

    public static styles = css`
        .container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            padding: 5px;
            user-select: none;
        }
        .container:hover {
            background-color: var(--red);
            color: white;
        }
        .selected {
            background-color: var(--red);
            color: white;
        }
        .text-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
        }

        .name {
            font-size: calc(16px + 1vmin);
            margin-bottom: 10px;
        }
        .chips {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .chips pokemon-chip {
            margin: 0 3px;
        }
        .container img {
            max-width: 100px;
        }
    `;

    public render() {
        const base = html`${this.pokemon?.name}`;

        if (!this.pokemon) {
            return base;
        }

        const types = this.pokemon!.varieties.flatMap(e => e.pokemon.types)
            .map(t => t.type)
            .filter((type, i, self) => self.indexOf(type) === i);

        return html`
            <div
                class="container ${this.selectedPokemon?.name ===
                this.pokemon?.name
                    ? 'selected'
                    : ''}"
            >
                ${this.pokemon.imageUrl &&
                html`<img src="${this.pokemon.imageUrl}" />`}
                <div class="text-container">
                    <div class="name">
                        ${LocalizationUtils.getName(
                            this.currentLanguage,
                            this.pokemon,
                            this.pokemon.name
                        )}
                    </div>
                    <div class="chips">
                        ${types.map(
                            type => html`
                                <pokemon-chip .value="${type}"></pokemon-chip>
                            `
                        )}
                    </div>
                </div>
            </div>
        `;
    }
}
