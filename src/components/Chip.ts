import { customElement, LitElement, property, html, css } from 'lit-element';
import { NamedResource } from '../models/NamedResource';
import { LocalizationUtils } from '../utils/LocalizationUtils';
import { AppState, store } from '../redux/Store';
import { connect } from 'pwa-helpers';

@customElement('pokemon-chip')
export class PokemonChip extends connect(store)(LitElement) {
    @property({ type: Object })
    private value?: NamedResource;

    @property({ type: String })
    private language = 'en';

    public stateChanged(state: AppState) {
        this.language = state.language.currentLanguage;
    }

    public static styles = css`
        .chip {
            font-size: 10px;
            height: 20px;
            border-radius: 10px;
            padding: 2px 6px;
            background-color: var(--blue);
            color: white;
            display: flex;
            flex-direction: row;
            align-items: center;
            text-align: center;
        }
        .chip span {
        }
    `;

    public render() {
        return html`
            <div class="chip">
                <span>
                    ${LocalizationUtils.getName(
                        this.language,
                        this.value
                    )}</span
                >
            </div>
        `;
    }
}
