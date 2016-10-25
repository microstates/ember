import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import StringHelper from 'ember-microstates/helpers/string';

describe('Unit: String', function() {
  beforeEach(function() {
    this.helper = StringHelper.create({
      recompute: sinon.spy()
    });

    this.value = this.helper.compute(['hello world'], {});
    this.valueOf = this.value.valueOf();
  });

  describe('initial value', function() {
    beforeEach(function() {
      this.undefinedValue = this.helper.initialValueFor([undefined]);
      this.nullValue = this.helper.initialValueFor([null]);
      this.numberValue = this.helper.initialValueFor([2]);
      this.toStringObjectValue = this.helper.initialValueFor([{
        toString() {
          return 'foo';
        }
      }]);
    });

    it('coerces undefined to empty string', function() {
      expect(this.undefinedValue).to.equal('');
    });
    
    it('coerces null to empty string', function() {
      expect(this.nullValue).to.equal('');
    });

    it('coerces number to string', function() {
      expect(this.numberValue).to.be.a('string');
      expect(this.numberValue).to.equal('2');
    });

    it('coerces object with toString result of toString', function() {
      expect(this.toStringObjectValue).to.equal('foo');
    });

  });

  it('unboxed to original value', function() {
    expect(this.valueOf).to.equal('hello world');
  });

  describe('set', function() {
    beforeEach(function(){
      this.set = this.value.set('42');
      this.setValueOf = this.set.valueOf();
    });

    it('unboxed to new value', function() {
      expect(this.setValueOf).to.equal('42');
    });
  });

});