import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click } from '@ember/test-helpers';

describe('Integration | Helper | value-of', function() {
  setupRenderingTest();

  it('extracts value from the microstate', async function() {

    this.render(hbs`
      {{#let (state 42) as |$|}}
        {{on-render (action (mut value)) (value-of $)}}
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(this.get('value')).to.equal(42);

    await click(this.$('button')[0]);

    expect(this.get('value')).to.equal(43);
  });
});

