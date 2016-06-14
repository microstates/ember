/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';
import StringMicrostate from 'ember-microstates/helpers/string';

const {
  RSVP,
  run: { later }
} = Ember;

describeComponent(
  'promise-handler',
  'Integration: PromiseHandlerHelper',
  {
    integration: true
  },
  function() {
    
    it('renders', function() {

      this.register('helper:promise-handler', StringMicrostate.extend({
        initialize() {
          return 'foo';
        }
      }));

      this.render(hbs`{{promise-handler}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');

    });

    it('waits for promise to resolve', function(done){

      this.register('helper:promise-handler', StringMicrostate.extend({
        actions: {
          refresh() {
            return new RSVP.Promise(function(resolve){
              later(function(){ 
                resolve('bar');
              }, 50);
            });
          }
        }
      }));

      this.render(hbs`
        {{#with (promise-handler 'foo') as |value|}}
          <span class="value">{{value}}</span>
          <button {{action value.refresh}}>Refresh</button>
        {{/with}}
      `);

      expect(this.$('.value').text()).to.equal('foo');

      this.$('button').click();

      expect(this.$('.value').text()).to.equal('foo');

      later(function(){
        expect(this.$('.value').text()).to.equal('bar');
        done();
      }, 100);
    });

  }
);
