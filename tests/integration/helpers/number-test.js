/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'recompute-helper',
  'Integration: Number Microstate',
  {integration: true},
  function() {
    beforeEach(function() {
      this.render(hbs`
{{#with (number 5) as |num|}}
{{#with (number 11) as |other|}}
  <span class="number">{{num}}</span>
  <span class="other">{{other}}</span>

  <button class="add" {{action (action num.add other)}}>Add</button>
{{/with}}
{{/with}}
`);
    });
    it("starts out with a value 5", function() {
      expect(this.$('.number').text()).to.equal('5');
      expect(this.$('.other').text()).to.equal('11');
    });

    describe("clicking on the next button", function() {
      beforeEach(function() {
        this.$('.add').click();
      });
      it("adds the numbers", function() {
        expect(this.$('.number').text()).to.equal('16');
      });
    });

  }
);
