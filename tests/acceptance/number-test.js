/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import $ from 'jquery';

describe('Acceptance: Number', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function() {
    visit('/');
  });
  it("initializes to the proper value", function() {
    expect($('.spec-number').text()).to.equal('5');
  });

  describe("increment", function() {
    beforeEach(function() {
      click('.spec-increment');
    });
    it("increased by 1", function() {
      expect($('.spec-number').text()).to.equal('6');
    });
  });

  describe("decrement", function() {
    beforeEach(function() {
      click('.spec-decrement');
    });
    it("increased by 1", function() {
      expect($('.spec-number').text()).to.equal('4');
    });
  });

});
