import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ListHelper from 'ember-microstates/helpers/list';

describe('List', function() {
  beforeEach(function() {
    this.helper = ListHelper.create({
      recompute: sinon.spy()
    });

    this.value = this.helper.compute([['a', 'b', 'c']], {});
    this.valueOf = this.value.valueOf();
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