/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { useState } from 'ember-microstates';
import Object from '@ember/object';

describe('Unit: Macro | useState', function() {
  describe('with arguments', function() {
    let Container = Object.extend({
      n: useState(42)
    });
  
    it('allows to create a number type using useState(42)', function() {
      expect(Container.create().get('n.state')).to.equal(42);
    });

    it('allows to increment', function() {
      let c = Container.create();
      c.get('n').increment();
      expect(c.n.state).to.equal(43);
    });

    it('does not share state between multiple instances', function() {
      let c1 = Container.create();
      let c2 = Container.create();
      c1.get('n').increment();
      expect(c1.get('n.state')).to.equal(43);
      expect(c2.get('n.state')).to.equal(42);
    });
  });

  describe('without arguments', function() {
    let Container = Object.extend({
      n: useState()
    });

    it('allows to create a value without a Type', function() {
      expect(Container.create().get('n.state')).to.equal(undefined);
    });

    it('allows to set', function() {
      let c = Container.create();
      c.get('n').set('hello world');
      expect(c.n.state).to.equal('hello world');
    });
  });
});
