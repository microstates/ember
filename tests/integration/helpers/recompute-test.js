/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'recompute-helper',
  'Integration: Recompute Action',
  {integration: true},
  function() {
    beforeEach(function() {

      this.render(hbs`
{{#with (string "Hello World!") as |str|}}
  <span class="message">{{str}}</span>

  <button class="next" {{action (action str.set "Hello Planet!")}}>Planet</button>
  <button class="recompute" {{action (action str.reset)}}>Reset</button>
{{/with}}
`);
    });
    it("starts out with a value of Hello World!", function() {
      expect(this.$('.message').text()).to.equal('Hello World!');
    });

    describe("clicking on the next button", function() {
      beforeEach(function() {
        this.$('.next').click();
      });
      it("swaps to Hello Planet", function() {
        expect(this.$('.message').text()).to.equal('Hello Planet!');
      });
      describe("clicking on the recompute button", function() {
        beforeEach(function() {
          this.$('.recompute').click();
        });
        it("resets it back to its initial state", function() {
          expect(this.$('.message').text()).to.equal('Hello World!');
        });
      });

    });

  }
);
