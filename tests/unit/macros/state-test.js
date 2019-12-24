import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { state, create } from '@microstates/ember';
import Object from '@ember/object';

module('Unit: Macro | state', function(hooks) {
  setupTest(hooks);

  test('with a value - allows to create a number type using state(42)', function(assert) {
    let Container = Object.extend({
      n: state(42)
    });
    let c = Container.create();
    assert.equal(c.n.state, 42);
  });

  test('with a value - allows to increment', function(assert) {
    let Container = Object.extend({
      n: state(42)
    });
    let c = Container.create();
    c.n.increment();
    assert.equal(c.n.state, 43);
  });

  test('with a value - does not share state between multiple instances', function(assert) {
    let Container = Object.extend({
      n: state(42)
    });
    let c1 = Container.create();
    let c2 = Container.create();
    c1.n.increment();
    assert.equal(c1.n.state, 43);
    assert.equal(c2.n.state, 42);
  });

  test('without arguments - allows to create a value without a Type', function(assert) {
    let Container = Object.extend({
      n: state()
    });

    assert.equal(Container.create().n.state, undefined);
  });

  test('without arguments - allows to set', function(assert) {
    let Container = Object.extend({
      n: state()
    });
    let c = Container.create();
    c.n.set('hello world');
    assert.equal(c.n.state, 'hello world');
  });

  test('with a microstate as an argument - allows to create a number type using use(create(Number, 42))', function(assert) {
    let Container = Object.extend({
      n: state(create(Number, 42))
    });
  
    assert.equal(Container.create().n.state, 42);
  });

  test('with a microstate as an argument - allows to increment', function(assert) {
    let Container = Object.extend({
      n: state(create(Number, 42))
    });
    let c = Container.create();
    c.n.increment();
    assert.equal(c.n.state, 43);
  });

  test('with a microstate as an argument - does not share state between multiple instances', function(assert) {
    let Container = Object.extend({
      n: state(create(Number, 42))
    });
    let c1 = Container.create();
    let c2 = Container.create();
    c1.get('n').increment();
    assert.equal(c1.n.state, 43);
    assert.equal(c2.n.state, 42);
  });

  test('with a type as an argument - allows to create a number type using useType(Number, 42)', function(assert) {
    let Container = Object.extend({
      n: state(Number, 42)
    });
  
    assert.equal(Container.create().n.state, 42);
  });

  test('with a type as an argument - allows to increment', function(assert) {
    let Container = Object.extend({
      n: state(Number, 42)
    });
    let c = Container.create();
    c.get('n').increment();
    assert.equal(c.n.state, 43);
  });

  test('with a type as an argument - does not share state between multiple instances', function(assert) {
    let Container = Object.extend({
      n: state(Number, 42)
    });
    let c1 = Container.create();
    let c2 = Container.create();
    c1.get('n').increment();
    assert.equal(c1.n.state, 43);
    assert.equal(c2.n.state, 42);
  });
});
