/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Object', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function() {
    return visit('/');
  });

  it('initializes object', function() {
    expect($('.spec-object-prop').length).to.equal(3);
  });

  describe('delete', function() {
    beforeEach(function() {
      return click('.spec-object-prop-make .spec-delete-prop');
    });

    it('removed property with key `make`', function() {
      expect($('.spec-object-prop').length).to.equal(2);
      expect($('.spec-object-prop-make').length).to.equal(0);
    });
  });

  describe('assign', function() {
    beforeEach(function() {
      return click('.spec-object-assign');
    });

    it('merged object', function() {
      expect($('.spec-object-prop').length).to.equal(5);
      expect($('.spec-object-prop-speed .spec-object-prop-value').text()).to.equal('fast');
      expect($('.spec-object-prop-suspension .spec-object-prop-value').text()).to.equal('stiff');
    });
  });

  describe('put', function() {
    beforeEach(function() {
      return click('.spec-object-put');
    });

    it('added property', function() {
      expect($('.spec-object-prop').length).to.equal(4);
      expect($('.spec-object-prop-year .spec-object-prop-value').text()).to.equal('1967');
    });
  });

});