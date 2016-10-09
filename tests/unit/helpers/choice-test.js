import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ChoiceHelper from 'ember-microstates/helpers/choice';

describe('Choice', function() {
  let onState = null;
  let onToggle = null;
  let onStateEvent = null;
  let onToggleEvent = null;
  let onRecompute = null;
  beforeEach(function() {
    [onState, onToggle, onStateEvent, onToggleEvent, onRecompute] = [
      sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()
    ];
    this.helper = ChoiceHelper.create({
      recompute: onRecompute
    });

    Ember.addListener(this.helper, 'state', this, onStateEvent);
    Ember.addListener(this.helper, 'toggle', this, onToggleEvent);
  });

  describe('single', function() {
    beforeEach(function() {
      this.value = this.helper.compute([['cat', 'dog', 'bird']], {
        selection: 'bird',      
        'on-state': onState, 
        'on-toggle': onToggle
      });
      this.valueOf = this.value.valueOf();
    });

    it('unboxed to selection', function() {
      expect(this.valueOf).to.equal('bird');
    });

    describe('select', function() {
      beforeEach(function() {
        this.selectedValue = this.value.options[0].select();
        this.selectedValueOf = this.selectedValue.valueOf();
      });

      it('unboxed to selection', function() {
        expect(this.selectedValueOf).to.equal('cat');
      });
    });
  });

  describe('multiple', function() {
    beforeEach(function() {
      this.value = this.helper.compute([['dog', 'cat', 'bird']], {
        multiple: true,
        selection: ['dog', 'cat'],      
        'on-state': onState, 
        'on-toggle': onToggle
      });
      this.valueOf = this.value.valueOf();
    });

    it('unboxed to selection', function() {
      expect(this.valueOf).to.deep.equal(['dog', 'cat']);
    });

    describe('toggle', function() {
      beforeEach(function() {
        this.selectedValue = this.value.options[0].toggle();
        this.selectedValueOf = this.selectedValue.valueOf();
      });

      it('unboxed to selection', function() {
        expect(this.selectedValueOf).to.deep.equal(['cat']);
      });
    });
  });

});