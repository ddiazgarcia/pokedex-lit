import { LitElement, html, customElement, css, property } from 'lit-element';
import { Pokemon } from '../models/Pokemon';
import { BaseApi } from '../api/BaseApi';
import { EndpointType } from '../api/EndpointType';
import { PageResult } from '../models/PageResult';

@customElement('pokemon-list')
export class PokemonList extends LitElement {
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

  private async loadList() {
    const response: PageResult<Pokemon> = await BaseApi.findAll<Pokemon>(
      EndpointType.POKEMON,
      0,
      5000
    );
    this.pokemonList = response.results;
  }

  @property({ type: Array })
  public pokemonList: Pokemon[];

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
