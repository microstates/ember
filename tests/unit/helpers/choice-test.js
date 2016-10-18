import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ChoiceHelper from 'ember-microstates/helpers/choice';
import { SingleChoice, MultipleChoice } from 'ember-microstates/models/choice';

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

    it('unboxed to a choice', function() {
      expect(this.valueOf).to.be.an.instanceof(SingleChoice);
      expect(this.valueOf.selection).to.equal('bird');      
    });

    describe('select', function() {
      beforeEach(function() {
        this.selectedValue = this.value.options[0].select();
        this.selectedValueOf = this.selectedValue.valueOf();
      });

      it('unboxed to a choice', function() {
        expect(this.selectedValueOf).to.be.an.instanceof(SingleChoice);
        expect(this.selectedValueOf.selection).to.equal('cat');          
      });
    });

    describe('set', function() {
      beforeEach(function() {
        this.setValue = this.value.set(['snake', 'wolf'], { selection: 'snake' });
      });

      it('transitions to new value', function() {
        expect(this.setValue.options[0].valueOf()).to.deep.equal({ value: 'snake', isSelected: true });
        expect(this.setValue.options[1].valueOf()).to.deep.equal({ value: 'wolf', isSelected: false });
        expect(this.setValue.selection).to.equal('snake');        
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

    it('unboxed to multipe choice', function() {
      expect(this.valueOf).to.be.an.instanceof(MultipleChoice);
      expect(this.valueOf.selection).to.deep.equal(['dog', 'cat']);
    });

    describe('toggle', function() {
      beforeEach(function() {
        this.selectedValue = this.value.options[0].toggle();
        this.selectedValueOf = this.selectedValue.valueOf();
      });

      it('unboxed to multiple choice', function() {
        expect(this.selectedValueOf).to.be.an.instanceof(MultipleChoice);
        expect(this.selectedValueOf.selection).to.deep.equal(['cat']);
      });
    });

    describe('set', function() {
      beforeEach(function() {
        this.setValue = this.value.set(['snake', 'wolf', 'rabbit'], { selection: ['wolf', 'rabbit'], multiple: true });
      });

      it('transitions to new value', function() {
        expect(this.setValue.options[0].valueOf()).to.deep.equal({ value: 'snake', isSelected: false });
        expect(this.setValue.options[1].valueOf()).to.deep.equal({ value: 'wolf', isSelected: true });
        expect(this.setValue.options[2].valueOf()).to.deep.equal({ value: 'rabbit', isSelected: true });        
        expect(this.setValue.selection).to.deep.equal(['wolf', 'rabbit']);        
      });
    });
  });

});