/* jshint expr:true */
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import BooleanHelper from 'ember-microstates/helpers/boolean';

describe('Boolean', function() {
  let onState = null;
  let onToggle = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onToggle, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy()
    ];
    this.helper = BooleanHelper.create({
      recompute: onRecompute
    });

    this.value = this.helper.compute([true], {'on-state': onState, 'on-toggle': onToggle});
    this.valueOf = this.value.valueOf();
  });

  it("computes to the initial state", function() {
    expect(this.value.value).to.equal(true);
  });

  it("unboxed to original value", function() {
    expect(this.valueOf).to.equal(true);
  });

  describe("toggling", function() {
    beforeEach(function() {
      this.toggled = this.value.toggle();
      this.toggledValueOf = this.toggled.valueOf();
    });

    it("swaps the state to false", function() {
      expect(this.toggled).to.equal(false);
    });

    it("invokes the on-state callback", function() {
      expect(onState.calledWith(false)).to.equal(true);
    });

    it("invokes the on-toggle callback", function() {
      expect(onToggle.calledWith(false)).to.equal(true);
    });

    it("unboxed to toggled value", function() {
      expect(this.toggledValueOf).to.equal(false);
    });
  });

  describe("set", function() {
    beforeEach(function() {
      this.setValue = this.value.set(false);
      this.setValueOf = this.setValue.valueOf();
    });

    it('transitioned to set value', function() {
      expect(this.setValueOf).to.equal(false);
    });
  });


});
