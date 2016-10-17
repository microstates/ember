/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ObjectHelper from 'ember-microstates/helpers/object';

describe('Object', function() {
  let onState = null;
  let onToggle = null;
  let onStateEvent = null;
  let onToggleEvent = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onToggle, onStateEvent, onToggleEvent, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()
    ];
    this.helper = ObjectHelper.create({
      recompute: onRecompute
    });

    Ember.addListener(this.helper, 'state', this, onStateEvent);
    Ember.addListener(this.helper, 'toggle', this, onToggleEvent);
    this.value = this.helper.compute([], { hello: 'world' }, {'on-state': onState, 'on-toggle': onToggle});
    this.valueOf = this.value.valueOf();
  });

  it('valueOf returns unboxed value', function() {
    expect(this.valueOf).to.deep.equal({ hello: 'world' });
  });

  describe('assign', function() {
    beforeEach(function() {
      this.assignedValue = this.value.assign({ hola: 'mundo' });
      this.assignedValueOf = this.assignedValue.valueOf();
    });

    it('valueOf returns unboxed value', function() {
      expect(this.assignedValueOf).to.deep.equal({ hello: 'world', hola: 'mundo' });
    });
  });

});