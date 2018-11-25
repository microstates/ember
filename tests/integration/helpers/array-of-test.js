import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Helper | array-of', function() {
  setupComponentTest('array-of', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#array-of}}
    //     template content
    //   {{/array-of}}
    // `);
    this.set('inputValue', '1234');

    this.render(hbs`{{array-of inputValue}}`);

    expect(this.$().text().trim()).to.equal('1234');
  });
});

