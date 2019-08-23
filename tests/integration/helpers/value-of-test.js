import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { render, click, find } from '@ember/test-helpers';

describe('Integration | Helper | value-of', function() {
  setupRenderingTest();

  it('extracts value from the microstate', async function() {

    await render(hbs`
      {{#let (state 42) as |$|}}
        {{on-render (action (mut value)) (value-of $)}}
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(this.get('value')).to.equal(42);

    await click(find('button'));

    expect(this.get('value')).to.equal(43);
  });
});

