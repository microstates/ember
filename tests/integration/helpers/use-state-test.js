import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Helper | use-state', function() {
  setupComponentTest('use-state', {
    integration: true
  });

  it('renders', function() {

    this.render(hbs`{{get (use-state '1234') 'state'}}`);

    expect(this.$().text().trim()).to.equal('1234');
  });
});

