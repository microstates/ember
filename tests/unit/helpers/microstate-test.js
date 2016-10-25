/* jshint expr:true */
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import { MicroState } from 'ember-microstates';

describe('Unit: Microstates', function() {
  let onState = null;
  let onCustom = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onCustom, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy()
    ];

    this.microstate = MicroState.create({
      recompute: onRecompute,

      initialValueFor([state = {initial: 'state'}]) {
        return state;
      }
    });

    this.value = this.microstate.compute([], {'on-state': onState, 'on-custom': onCustom});
  });

  it("computes to the initial state ", function() {
    expect(this.value).to.deep.equal({initial: 'state'});
  });

  describe("setting the state with a custom event", function() {
    beforeEach(function() {
      this.next = this.microstate.transition('custom', ()=> ({totally: 'custom'}));
    });

    it("sets the new state", function() {
      expect(this.microstate.value).to.deep.equal({totally: 'custom'});
    });

    it("returns the new state from the transition() function", function() {
      expect(this.next).to.deep.equal({totally: 'custom'});
    });

    it("invokes the on-state callback", function() {
      expect(onState.calledWith({totally: 'custom'})).to.equal(true);
    });

    it("invokes the on-custom callback", function() {
      expect(onCustom.calledWith({totally: 'custom'})).to.equal(true);
    });
  });
});
