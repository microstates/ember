/*jshint -W053 */
import { expect } from 'chai';
import { describe, beforeEach, afterEach, it } from 'mocha';
import { MicroState } from 'ember-microstates';

describe("Completely Independent Microstate", function() {
  let microstate, transition, subscription;

  beforeEach(function() {
    microstate = new MicroState(5, {
      wrap: value => new Number(Number(value)),
      actions: {
        add(current, amount) {
          return current + amount;
        },
        subtract(current, amount) {
          return this.add(current, -amount);
        }
      }
    });
    subscription = microstate.subscribe(t => transition = t);
  });

  afterEach(function() {
    subscription.unsubscribe();
  });

  it("contains an initial value", function() {
    expect(subscription.initial.valueOf()).to.equal(5);
  });
  describe("invoking the add action", function() {
    beforeEach(function() {
      subscription.initial.add(5);
    });
    it("triggers a transition", function() {
      expect(transition).to.be.instanceOf(Object);
    });
    it("contains the previous value", function() {
      expect(transition.previous).to.equal(5);
    });
    it("cantains the next value", function() {
      expect(transition.next).to.equal(10);
    });
    it("contains the next state", function() {
      expect(transition.state).to.be.instanceOf(Number);
    });

    describe("invoking the add action on the new state", function() {
      beforeEach(function() {
        transition.state.add(-3);
      });
      it("transitions again ", function() {
        expect(transition.next).to.equal(7);
        expect(transition.previous).to.equal(10);
      });
    });
  });
  describe("invoking the subtract function which is defined in terms of the add function", function() {
    beforeEach(function() {
      subscription.initial.subtract(3);
    });
    it("transitions to the 2 state", function() {
      expect(transition.next).to.equal(2);
    });

  });


});
