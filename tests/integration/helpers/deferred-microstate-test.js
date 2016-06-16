/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';
import { DeferredMicroState } from 'ember-microstates';
import assign from 'ember-microstates/utils/assign';

const {
  RSVP: { Promise, reject },
  run: { later }
} = Ember;

const DeferredStringMicroState = DeferredMicroState.extend({
  wrap(value) {
    return assign(String(value), {
      toString() { return value; }
    });
  },

  actions: {
    recompute(previous, [string = '']) {
      return string;
    },

    set(string, value) {
      return String(value);
    }
  }
});

describeComponent(
  'promise-handler',
  'Integration: PromiseHandlerHelper',
  {
    integration: true
  },
  function() {
    
    it('renders', function() {

      this.register('helper:promise-handler', DeferredStringMicroState);

      this.render(hbs`{{promise-handler 'foo'}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');

    });

    it('waits for promise to resolve', function(done){

      this.register('helper:promise-handler', DeferredStringMicroState.extend({
        actions: {
          refresh() {
            return resolveWithDelay('bar');
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

      this.register('helper:promise-handler', DeferredStringMicroState.extend({
        actions: {
          slow() {
            return resolveWithDelay('slow response', 100);
          },
          faster() {
            return resolveWithDelay('faster response', 50);
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

    it('has state properties', function(done){

      this.register('helper:promise-handler', DeferredStringMicroState.extend({
        actions: {
          slow() {
            return resolveWithDelay('slow response', 25);
          }
        }
      }));

      this.render(hbs`
        {{#with (promise-handler 'foo') as |value|}}
          <span class="value {{if value.isNew 'is-new'}} {{if value.isPending 'is-pending'}} {{if value.isComplete 'is-complete'}} {{if value.isError 'is-error'}}">
            {{value}}
          </span>
          <button {{action value.slow}}>Slow</button>
        {{/with}}
      `);

      expect(this.$('.value').text().trim()).to.equal('foo');

      expect(this.$('.value').hasClass('is-new')).to.be.true;
      expect(this.$('.value').hasClass('is-pending')).to.be.false;
      expect(this.$('.value').hasClass('is-complete')).to.be.false;
      expect(this.$('.value').hasClass('is-error')).to.be.false;

      this.$('button:contains(Slow)').click();

      expect(this.$('.value').text().trim()).to.equal('foo');

      expect(this.$('.value').hasClass('is-new')).to.be.false;
      expect(this.$('.value').hasClass('is-pending')).to.be.true;
      expect(this.$('.value').hasClass('is-complete')).to.be.false;
      expect(this.$('.value').hasClass('is-error')).to.be.false;

      later(function(){
        expect(this.$('.value').text().trim()).to.equal('slow response');

        expect(this.$('.value').hasClass('is-new')).to.be.false;
        expect(this.$('.value').hasClass('is-pending')).to.be.false;
        expect(this.$('.value').hasClass('is-complete')).to.be.true;
        expect(this.$('.value').hasClass('is-error')).to.be.false;

        done();
      }, 50);

    });

    it('can be recomputed after an error', function(){

      this.register('helper:promise-handler', DeferredStringMicroState.extend({
        actions: {
          bad() {
            return reject('failed response');
          }
        }
      }));

      this.render(hbs`
        {{#with (promise-handler 'foo') as |value|}}
          <span class="value {{if value.isNew 'is-new'}} {{if value.isPending 'is-pending'}} {{if value.isComplete 'is-complete'}} {{if value.isError 'is-error'}}">
            {{value}}
          </span>
          <span class="error">{{value.error}}</span>
          <button {{action value.bad}}>Bad</button>
          <button {{action value.recompute}}>Reset</button>
        {{/with}}
      `);

      expect(this.$('.value').text().trim()).to.equal('foo');

      expect(this.$('.value').hasClass('is-new')).to.be.true;
      expect(this.$('.value').hasClass('is-error')).to.be.false;

      this.$('button:contains(Bad)').click();

      expect(this.$('.value').text().trim()).to.equal('foo');
      expect(this.$('.error').text().trim()).to.equal('failed response');
      expect(this.$('.value').hasClass('is-new')).to.be.false;
      expect(this.$('.value').hasClass('is-error')).to.be.true;

      this.$('button:contains(Reset)').click();
      
      expect(this.$('.value').text().trim()).to.equal('foo');
      expect(this.$('.error').text().trim()).to.equal('');
      expect(this.$('.value').hasClass('is-new')).to.be.true;
      expect(this.$('.value').hasClass('is-error')).to.be.false;      

    });

  }
);

function resolveWithDelay(value, delay = 50) {
  return new Promise(function(resolve){
      later(function(){
        resolve(value);
      }, delay);
    });
}