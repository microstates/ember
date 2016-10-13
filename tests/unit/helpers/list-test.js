import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ListHelper from 'ember-microstates/helpers/list';

describe('List', function() {
  let onState = null;
  let onToggle = null;
  let onStateEvent = null;
  let onToggleEvent = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onToggle, onStateEvent, onToggleEvent, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()
    ];
    this.helper = ListHelper.create({
      recompute: onRecompute
    });

    Ember.addListener(this.helper, 'state', this, onStateEvent);
    Ember.addListener(this.helper, 'toggle', this, onToggleEvent);
    this.value = this.helper.compute([['a', 'b', 'c']], {'on-state': onState, 'on-toggle': onToggle});
    this.valueOf = this.value.valueOf();
  });

  it('has non enumerable valueOf', function() {
    expect(this.value.valueOf).to.be.a('function');
    expect(this.value.propertyIsEnumerable()).to.be.equal(false);
  });

  it('unboxed to original value', function() {
    expect(this.valueOf).to.deep.equal(['a', 'b', 'c']);
  });

  describe('push', function() {
    beforeEach(function() {
      this.pushed = this.value.push('d');
      this.pushedValueOf = this.pushed.valueOf();
    });

    it('unboxed to new value', function() {
      expect(this.pushedValueOf).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });

});