/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import BooleanHelper from 'ember-microstates/helpers/boolean';

describe('Boolean', function() {
  let onState = null;
  let onToggle = null;
  let onStateEvent = null;
  let onToggleEvent = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onToggle, onStateEvent, onToggleEvent, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()
    ];
    this.helper = BooleanHelper.create({
      recompute: onRecompute
    });

    Ember.addListener(this.helper, 'state', this, onStateEvent);
    Ember.addListener(this.helper, 'toggle', this, onToggleEvent);
    this.value = this.helper.compute([true], {'on-state': onState, 'on-toggle': onToggle});
  });

  it("computes to the initial state ", function() {
    expect(this.value.value).to.equal(true);
  });

  describe("toggling", function() {
    beforeEach(function() {
      this.toggled = this.value.toggle();
    });

    it("swaps the state to false", function() {
      expect(this.toggled).to.equal(false);
    });

    it("fires the 'state' event", function() {
      expect(onStateEvent.called).to.equal(true);
    });

    it("invokes the on-state callback", function() {
      expect(onState.calledWith(false)).to.equal(true);
    });

    it("fires the 'toggle' event", function() {
      expect(onStateEvent.called).to.equal(true);
    });

    it("invokes the on-toggle callback", function() {
      expect(onToggle.calledWith(false)).to.equal(true);
    });
  });


});
