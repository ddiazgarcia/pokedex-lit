import { customElement, LitElement, property, html, css } from 'lit-element';
import { Generation } from '../models/Games';
import { AppState, store } from '../redux/Store';
import { EntityType } from '../models/EntityType';
import { LocalizationUtils } from '../utils/LocalizationUtils';
import { connect } from 'pwa-helpers';
import { selectGeneration } from '../redux/Actions';
import { PokemonApi } from '../api/PokemonApi';

@customElement('generation-list')
export class GenerationList extends connect(store)(LitElement) {
    @property({ type: Array, attribute: false })
    private generations: Generation[] = [];

    @property({ type: String, attribute: false })
    private currentLanguage = 'en';

    @property({ type: Object, attribute: false })
    private selectedGeneration?: Generation;

    public stateChanged(state: AppState) {
        // App initial load includes generations.
        this.generations = state.pokemon.getEntities<Generation>(
            EntityType.GENERATION
        );
        this.currentLanguage = state.language.currentLanguage;
        this.selectedGeneration = state.selection.generation;
    }

    private onGenerationSelected(generation: string) {
        const selectedGeneration = this.generations.find(
            gen => gen.name === generation
        );
        store.dispatch(selectGeneration(selectedGeneration));
        PokemonApi.getPokemonSpecies(selectedGeneration?.pokemon_species || []);
        // store.dispatch(
        //     selectPokemonList(selectedGeneration?.pokemon_species || [])
        // );
    }

    static styles = css`
        * {
            box-sizing: border-box;
        }
        .generation-container {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            font-size: calc(12px + 0.5vmin);
            text-align: center;
            flex-wrap: wrap;
            margin-top: 3vmin;
            background-color: var(--blue);
            color: white;
        }
        .generation-item {
            padding: 10px 5px;
            width: 25%;
        }

        .generation-item:hover {
            background-color: var(--red);
            text-decoration: underline;
        }

        .item-selected {
            background-color: var(--red);
        }
        @media only screen and (min-width: 992px) {
            .generation-item {
                width: 12.5%;
            }
        }
    `;

    public render() {
        return html`
            <div class="generation-container">
                ${this.generations.map(
                    gen => html`
                        <div
                            class="generation-item ${this.selectedGeneration
                                ?.name === gen.name
                                ? 'item-selected'
                                : ''}"
                            @click=${() => this.onGenerationSelected(gen.name)}
                        >
                            ${LocalizationUtils.getName(
                                this.currentLanguage,
                                gen
                            )}
                        </div>
                    `
                )}
            </div>
        `;
    }
}
