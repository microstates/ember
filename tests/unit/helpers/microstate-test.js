/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import { MicroState } from 'ember-microstates';

describe.only('Microstates', function() {
  let onState = null;
  let onCustom = null;
  let onStateEvent = null;
  let onCustomEvent = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onCustom, onStateEvent, onCustomEvent, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()
    ];

    this.microstate = MicroState.create({
      default: {initial: 'state'},
      recompute: onRecompute
    });

    Ember.addListener(this.microstate, 'state', this, onStateEvent);
    Ember.addListener(this.microstate, 'custom', this, onCustomEvent);
    this.value = this.microstate.compute([], {'on-state': onState, 'on-custom': onCustom});
  });

  it("computes to the initial state ", function() {
    expect(this.value).to.deep.equal({initial: 'state'});
  });

  describe("setting the state with a custom event", function() {
    beforeEach(function() {
      this.microstate.setState('custom', ()=> ({totally: 'custom'}));
    });

    it("sets the new state", function() {
      expect(this.microstate.value).to.deep.equal({totally: 'custom'});
    });

    it("fires the 'state' event", function() {
      expect(onStateEvent.called).to.equal(true);
    });

    it("invokes the on-state callback", function() {
      expect(onState.calledWith({totally: 'custom'})).to.equal(true);
    });

    it("fires the 'custom' event", function() {
      expect(onCustomEvent.calledWith({totally: 'custom'})).to.equal(true);
    });

    it("invokes the on-custom callback", function() {
      expect(onCustom.calledWith({totally: 'custom'})).to.equal(true);
    });
  });
});
