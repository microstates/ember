/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

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

  describe("subtracting 1", function() {
    beforeEach(function() {
      click('.spec-subtract');
    });
    it("subtracts 1 from the initial value", function() {
      expect($('.spec-number').text()).to.equal('4');
    });
  });

  describe("adding 1", function() {
    beforeEach(function() {
      click('.spec-add');
    });
    it("adds 1 to the initial value", function() {
      expect($('.spec-number').text()).to.equal('6');
    });
  });

});
