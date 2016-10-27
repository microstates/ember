/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import Microstates from 'ember-microstates/initializers/microstates';
import Ember from 'ember';

const {
  run,
  Helper: { helper }
} = Ember;

describeComponent('ember-composable-helpers', { integration: true },
  function() {
    beforeEach(function() {
      Microstates.initialize(this.container.registry);
    });
    describe('filter-by', function() {
      beforeEach(function() {
        this.register('helper:value-of', helper(function([value]){
          if (value && value.valueOf && value.valueOf.call) {
            return value.valueOf();
          } else {
            return value;
          }
        }));
        this.set('things', [
          { type: 'fruit',    name: 'apple' }, 
          { type: 'fruit',    name: 'pear' }, 
          { type: 'clothing', name: 'panths' } 
        ]);
        this.render(hbs`
          {{let type=(String)}}
          {{#each (filter-by "type" (value-of type) things) as |item|}}
            <span class="spec-thing">{{item.name}}</span>
          {{/each}}
          <button {{action type.set "fruit"}}>Show fruit</button> <button {{action type.set ""}}>Show clothing</button>
        `);
      });

      it('shows unfiltered list', function() {
        expect(this.$('.spec-thing').length).to.equal(3);
      });

      describe('filtered results', function() {
        beforeEach(function() {
          run( () => this.$('button:contains(Show fruit)').click() );
        });

        it('shows only fruit', function() {
          expect(this.$('.spec-thing').text()).to.equal('applepear');
        });
      });
    });
  }
);
