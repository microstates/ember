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