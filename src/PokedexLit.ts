import { LitElement, html, css, property } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import './views/PokemonList';

export class PokedexLit extends LitElement {
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
      color: #1a2b42;
      /* max-width: 960px; */
      margin: 0 auto;
      text-align: center;
    }

    main {
      flex-grow: 1;
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

  render() {
    return html`
      <main>
        <!-- <div class="logo">${openWcLogo}</div> -->
        <h1>My app</h1>

        <p>Edit <code>src/PokedexLit.js</code> and save to reload.</p>
        <a
          class="app-link"
          href="https://open-wc.org/developing/#code-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code examples
        </a>
        <pokemon-list></pokemon-list>
      </main>

      <footer class="app-footer">Pokedex-lit</footer>
    `;
  }
}
