/* jshint expr:true */
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ObjectHelper from 'ember-microstates/helpers/object';

describe('Object', function() {
  beforeEach(function() {
    this.helper = ObjectHelper.create({
      recompute: sinon.spy()
    });

    this.value = this.helper.compute([], { hello: 'world' });
    this.valueOf = this.value.valueOf();
  });

  it('valueOf returns unboxed value', function() {
    expect(this.valueOf).to.deep.equal({ hello: 'world' });
  });

  describe('assign', function() {
    beforeEach(function() {
      this.assignedValue = this.value.assign({ hola: 'mundo' });
      this.assignedValueOf = this.assignedValue.valueOf();
    });

    it('valueOf returns unboxed value', function() {
      expect(this.assignedValueOf).to.deep.equal({ hello: 'world', hola: 'mundo' });
    });
  });

});