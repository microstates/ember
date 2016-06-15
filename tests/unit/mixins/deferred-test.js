/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import DeferredMixin from 'ember-microstates/mixins/deferred';

describe('DeferredMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let DeferedObject = Ember.Object.extend(DeferredMixin);
    let subject = DeferedObject.create();
    expect(subject).to.be.ok;
  });
});
