import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ListHelper from 'ember-microstates/helpers/list';

describe('Unit: List', function() {
  beforeEach(function() {
    this.helper = ListHelper.create({
      recompute: sinon.spy()
    });

    this.value = this.helper.compute([['a', 'b', 'c']], {});
    this.valueOf = this.value.valueOf();
  });

  describe('initial value', function() {
    beforeEach(function() {
      this.stringValue = this.helper.initialValueFor(['hello']);
      this.nullValue = this.helper.initialValueFor([null]);
      this.undefinedValue = this.helper.initialValueFor([undefined]);
      this.arrayValue = this.helper.initialValueFor([['a', 'b', 'c']]);
      this.objectWithLengthValue = this.helper.initialValueFor([{ length: 3 }]);
    });

    it('wraps string value in an array', function() {
      expect(this.stringValue).to.deep.equal(['hello']);
    });

    it('wraps null value in an array', function() {
      expect(this.nullValue).deep.equal([null]);
    });

    it('returns an empty array for undefined', function() {
      expect(this.undefinedValue).deep.equal([]);
    });

    it('keeps array unmodified', function() {
      expect(this.arrayValue).deep.equal(['a', 'b', 'c']);
    });

    it('treats objects with length property as arrays', function() {
      expect(this.objectWithLengthValue).to.deep.equal({length: 3});
    });
  });

  it('has non enumerable valueOf', function() {
    expect(this.value.valueOf).to.be.a('function');
    expect(this.value.propertyIsEnumerable()).to.be.equal(false);
  });

  it('unboxed to original value', function() {
    expect(this.valueOf).to.deep.equal(['a', 'b', 'c']);
  });

  describe('push', function() {
    beforeEach(function() {
      this.pushed = this.value.push('d');
      this.pushedValueOf = this.pushed.valueOf();
    });

    it('unboxed to new value', function() {
      expect(this.pushedValueOf).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });

  describe('set', function() {
    beforeEach(function() {
      this.setValue = this.value.set(['x', 'y', 'z']);
    });

    it('sets new value', function() {
      expect(this.setValue.valueOf()).to.deep.equal(['x', 'y', 'z']);
    });
  });

});