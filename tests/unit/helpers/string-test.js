import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import StringHelper from 'ember-microstates/helpers/string';

describe('String', function() {
  let onState = null;
  let onToggle = null;
  let onStateEvent = null;
  let onToggleEvent = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onToggle, onStateEvent, onToggleEvent, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()
    ];
    this.helper = StringHelper.create({
      recompute: onRecompute
    });

    Ember.addListener(this.helper, 'state', this, onStateEvent);
    Ember.addListener(this.helper, 'toggle', this, onToggleEvent);
    this.value = this.helper.compute(['hello world'], {'on-state': onState, 'on-toggle': onToggle});
    this.valueOf = this.value.valueOf();
  });

  it('unboxed to original value', function() {
    expect(this.valueOf).to.equal('hello world');
  });

  describe('set', function() {
    beforeEach(function(){
      this.set = this.value.set('42');
      this.setValueOf = this.set.valueOf();
    });

    it('unboxed to new value', function() {
      expect(this.setValueOf).to.equal('42');
    });
  });

});