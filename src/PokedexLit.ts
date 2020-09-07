import { LitElement, html, css, property } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import { LanguageApi } from './api/LanguageApi';
import { connect } from 'pwa-helpers';
import { store, AppState } from './redux/Store';
import { Language } from './models/Language';
import { changeLanguage } from './redux/Actions';
import './views/PokemonList';
import './components/GenerationList';
import { InitialLoad } from './api/InitialLoad';
import { LocalizationUtils } from './utils/LocalizationUtils.js';

export class PokedexLit extends connect(store)(LitElement) {
    @property({ type: String }) page = 'main';

    @property({ type: String }) title = '';

    static styles = css`
        :host {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            font-size: calc(10px + 2vmin);
            color: var(--dark);
            /* max-width: 960px; */
            margin: 0 auto;
            text-align: center;
        }

        main {
            flex-grow: 1;
            width: 100%;
        }

        .title {
            display: flex;
            flex-direction: column;
        }

        .language {
            font-size: calc(10px + 1vmin);
        }

        @media screen and (min-width: 600px) {
            .title {
                flex-direction: row;
                align-items: center;
            }

            .title h1 {
                width: 75%;
            }

            .title .language {
                width: 25%;
            }
        }

        .logo > svg {
            margin-top: 36px;
            animation: app-logo-spin infinite 20s linear;
        }

        @keyframes app-logo-spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .app-footer {
            font-size: calc(12px + 0.5vmin);
            align-items: center;
            background-color: gray;
            padding: 10px 0;
            width: 100%;
        }

        .app-footer a {
            margin-left: 5px;
        }
    `;

    public connectedCallback() {
        super.connectedCallback();
        this.loadData();
    }

    public disconnectedCallback() {
        //super.disconnectedCallback();
        this.saveData();
    }

    @property({ type: Array })
    public languages: Language[] = [];

    @property({ type: String })
    public currentLanguage = 'en';

    public stateChanged(state: AppState) {
        this.languages = state.language.languages;
        this.currentLanguage = state.language.currentLanguage;
    }

    private async loadData() {
        // const lMap = LocalStorageApi.getListMap();
        // const eMap = LocalStorageApi.getEntityMap();
        // if (!lMap || !eMap) {
        //     await PokemonApi.getPokemonSpeciesList();
        //     LocalStorageApi.saveListMap(store.getState().pokemon.listMap);
        //     //LocalStorageApi.saveEntityMap(store.getState().pokemon.entityMap);
        // } else {
        //     store.dispatch(initialLoad(lMap, eMap));
        // }
        InitialLoad.start();
        LanguageApi.getLanguages();
    }

    private saveData() {
        const state = store.getState().pokemon;
        globalThis.localStorage.setItem(
            'entityMap',
            JSON.stringify(state.entityMap)
        );
        globalThis.localStorage.setItem(
            'listMap',
            JSON.stringify(state.listMap)
        );
    }

    private selectLanguage(event: any) {
        store.dispatch(changeLanguage(event.currentTarget.value));
        console.log(`Current language is ${event.currentTarget.value}`);
    }

    render() {
        return html`
            <main>
                <!-- <div class="logo">${openWcLogo}</div> -->
                <div class="title">
                    <h1>My Pokédex</h1>
                    <div class="language">
                        <label for="language"
                            >Language:
                            <select
                                @change="${this.selectLanguage}"
                                id="language"
                            >
                                ${this.languages.map(
                                    lang => html`
                                        <option
                                            value="${lang.name}"
                                            ?selected="${lang.name ===
                                            this.currentLanguage}"
                                        >
                                            ${LocalizationUtils.getName(
                                                lang.name,
                                                lang,
                                                lang.name
                                            )}
                                        </option>
                                    `
                                )}
                            </select>
                        </label>
                    </div>
                </div>
                <!-- <p>Edit <code>src/PokedexLit.js</code> and save to reload.</p>
                <a
                    class="app-link"
                    href="https://open-wc.org/developing/#code-examples"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Code examples
                </a> -->
                <generation-list></generation-list>
                <pokemon-list></pokemon-list>
            </main>

            <footer class="app-footer">Pokedex-lit</footer>
        `;
    }
}
