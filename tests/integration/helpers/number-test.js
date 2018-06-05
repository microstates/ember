import { click, find } from '@ember/test-helpers';
/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import Microstates from 'ember-microstates/initializers/microstates';

describeComponent(
  'recompute-helper',
  'Integration: Number Microstate',
  {integration: true},
  function() {
    beforeEach(function() {
      Microstates.initialize(this.container.registry);      
      this.render(hbs`
{{#with (Number 5) as |num|}}
{{#with (Number 11) as |other|}}
  <span class="number">{{num}}</span>
  <span class="other">{{other}}</span>

  <button class="add" {{action (action num.add other)}}>Add</button>
{{/with}}
{{/with}}
`);
    });
    it("starts out with a value 5", function() {
      expect(find('.number').textContent).to.equal('5');
      expect(find('.other').textContent).to.equal('11');
    });

    describe("clicking on the next button", function() {
      beforeEach(async function() {
        await click('.add');
      });
      it("adds the numbers", function() {
        expect(find('.number').textContent).to.equal('16');
      });
    });

  }
);
