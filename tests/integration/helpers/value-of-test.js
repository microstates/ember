import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from "@ember/test-helpers";
import hbs from 'htmlbars-inline-precompile';	

module('Integration | Helper | value-of', function(hooks) {
  setupRenderingTest(hooks);

  test('extracts value from the microstate', async function(assert) {

    await render(hbs`
      {{#let (state 42) as |$|}}
        {{on-render (action (mut value)) (value-of $)}}
        <button {{action $.increment}} />
      {{/let}}
    `);

    assert.equal(this.get('value'), 42);

    await click(find('button'));

    assert.equal(this.get('value'), 43);
  });
});

