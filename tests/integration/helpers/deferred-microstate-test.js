/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';
import StringMicrostate from 'ember-microstates/helpers/string';
import DeferredMixin from 'ember-microstates/mixins/deferred';

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

      this.register('helper:promise-handler', StringMicrostate.extend(DeferredMixin));

      this.render(hbs`{{promise-handler 'foo'}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');

    });

    it('waits for promise to resolve', function(done){

      this.register('helper:promise-handler', StringMicrostate.extend(DeferredMixin, {
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

    it('always receives value from last request', function(done){

      this.register('helper:promise-handler', StringMicrostate.extend(DeferredMixin, {
        actions: {
          slow() {
            return new RSVP.Promise(function(resolve){
              later(function(){ 
                resolve('slow response');
              }, 100);
            });
          },
          faster() {
            return new RSVP.Promise(function(resolve){
              later(function(){
                resolve('faster response');
              }, 50);
            });
          }
        }
      }));

      this.render(hbs`
        {{#with (promise-handler 'initial') as |value|}}
          <span class="value">{{value}}</span>
          <button {{action value.faster}}>Faster request</button>
          <button {{action value.slow}}>Slow request</button>
        {{/with}}
      `);

      expect(this.$('.value').text()).to.equal('initial'); // value did not change

      this.$(':contains(Slow request)').click();

      expect(this.$('.value').text()).to.equal('initial');

      this.$(':contains(Faster request)').click(); 


      expect(this.$('.value').text()).to.equal('initial'); // value did not change

      later(function(){
        expect(this.$('.value').text()).to.equal('faster response');
        done();
      }, 150);

    });

  }
);
