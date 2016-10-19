import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ChoiceHelper from 'ember-microstates/helpers/choice';
import { SingleChoice, MultipleChoice } from 'ember-microstates/models/choice';

describe('Choice', function() {
  beforeEach(function() {
    this.helper = ChoiceHelper.create({
      recompute: sinon.spy()
    });
  });

  describe('single', function() {
    beforeEach(function() {
      this.value = this.helper.compute([['cat', 'dog', 'bird']], {
        selection: 'bird'
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
  });

  describe('multiple', function() {
    beforeEach(function() {
      this.value = this.helper.compute([['dog', 'cat', 'bird']], {
        multiple: true,
        selection: ['dog', 'cat']
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
  });

});