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

  describe('initial value', function() {
    beforeEach(function() {
      this.undefinedValue = this.helper.initialValueFor([undefined]);
      this.nullValue = this.helper.initialValueFor([null]);
      this.stringValue = this.helper.initialValueFor(['hello']);
      this.stringWithNumber = this.helper.initialValueFor(['123']);
    });

    it('coerces undefined to 0', function() {
      expect(this.undefinedValue).to.equal(0);
    });

    it('coerces null to 0', function() {
      expect(this.nullValue).to.equal(0);
    });

    it('coerces string to NaN', function() {
      expect(this.stringValue).to.be.NaN;
    });

    it('coerces number string to number', function() {
      expect(this.stringWithNumber).to.equal(123);
    });
  });

  describe('NaN handling', function() {
    beforeEach(function() {
      this.nullValue = this.helper.compute([null], {});
    });
    
    it("handles NaN gracefully", function() {
      let result;
      expect(() => {
        result = this.nullValue.add(3);
      }).to.not.throw();

      expect(result).to.equal(3);
    });
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