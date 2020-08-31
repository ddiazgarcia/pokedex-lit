import { html, fixture, expect } from '@open-wc/testing';

import {PokedexLit} from '../src/PokedexLit.js';
import '../src/pokedex-lit.js';

describe('PokedexLit', () => {
  let element: PokedexLit;
  beforeEach(async () => {
    element = await fixture(html`
      <pokedex-lit></pokedex-lit>
    `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
