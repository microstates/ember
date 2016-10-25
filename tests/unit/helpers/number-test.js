import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import NumberHelper from 'ember-microstates/helpers/number';

describe('Unit: Number', function() {
  beforeEach(function() {
    this.helper = NumberHelper.create({
      recompute: sinon.spy()
    });

    this.value = this.helper.compute([42], {});
    this.valueOf = this.value.valueOf();
  });

  it('unboxed to original value', function() {
    expect(this.valueOf).to.equal(42);
  });

  describe('add', function() {
    beforeEach(function(){
      this.result = this.value.add(3);
      this.resultValueOf = this.result.valueOf();
    });

    it('unboxed to added value', function() {
      expect(this.resultValueOf).to.equal(45);
    });
  });

  describe('set', function() {
    beforeEach(function(){
      this.setValue = this.value.set(5);
    });

    it('sets to new value', function() {
      expect(this.setValue.valueOf()).to.equal(5);
    });
  });

});