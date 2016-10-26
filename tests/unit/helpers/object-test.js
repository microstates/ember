/* jshint expr:true */
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import ObjectHelper from 'ember-microstates/helpers/object';

describe('Unit: Object', function() {
  let onAssign;
  beforeEach(function() {
    onAssign = sinon.spy();
    this.helper = ObjectHelper.create({
      recompute: sinon.spy()
    });

    this.value = this.helper.compute([{ hello: 'world' }], { "on-assign": onAssign });
    this.valueOf = this.value.valueOf();
  });

  describe('initial value', function() {
    beforeEach(function() {
      this.undefinedValue = this.helper.initialValueFor([undefined]);
    });
    it('uses empty hash for undefined', function() {
      expect(this.undefinedValue).to.deep.equal({});
    });
    it('does not coerce primitive values', function() {
      expect(() => {
        this.helper.initialValueFor([10]);
      }).to.throw('Object microstate expects a non primitive value in its constructor, but received 10');

      expect(() => {
        this.helper.initialValueFor(['hello']);
      }).to.throw('Object microstate expects a non primitive value in its constructor, but received hello');

      expect(() => {
        this.helper.initialValueFor([null]);
      }).to.throw('Object microstate expects a non primitive value in its constructor, but received null');
    });
  });

  it('valueOf returns unboxed value', function() {
    expect(this.valueOf).to.deep.equal({ hello: 'world' });
  });

  describe('assign', function() {
    beforeEach(function() {
      this.assignedValue = this.value.assign({ hola: 'mundo' });
      this.assignedValueOf = this.assignedValue.valueOf();
    });

    it('invokes the on-assign callback', function() {
      expect(onAssign.called).to.equal(true);
      expect(onAssign.calledWith({ hola: 'mundo', hello: 'world' })).to.equal(true);
    });

    it('valueOf returns unboxed value', function() {
      expect(this.assignedValueOf).to.deep.equal({ hello: 'world', hola: 'mundo' });
    });
  });

});