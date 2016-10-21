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

  describe("subtracting 2", function() {
    beforeEach(function() {
      click('.spec-subtract');
    });
    it("subtracts 2 from the initial value", function() {
      expect($('.spec-number').text()).to.equal('3');
    });
  });

  describe("adding 2", function() {
    beforeEach(function() {
      click('.spec-add');
    });
    it("adds 2 to the initial value", function() {
      expect($('.spec-number').text()).to.equal('7');
    });
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

  describe("multiply", function() {
    beforeEach(function() {
      click('.spec-multiply');
    });
    it("multiply by 5", function() {
      expect($('.spec-number').text()).to.equal('25');
    });
  });

  describe("divide", function() {
    beforeEach(function() {
      click('.spec-divide');
    });
    it("divide by 5", function() {
      expect($('.spec-number').text()).to.equal('1');
    });
  });

});
