import { click, visit } from '@ember/test-helpers';
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
import $ from 'jquery';

describe('Acceptance: Number', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(async function() {
    await visit('/');
  });
  it("initializes to the proper value", function() {
    expect($('.spec-number').text()).to.equal('5');
  });

  describe("subtracting 2", function() {
    beforeEach(async function() {
      await click('.spec-subtract');
    });
    it("subtracts 2 from the initial value", function() {
      expect($('.spec-number').text()).to.equal('3');
    });
  });

  describe("adding 2", function() {
    beforeEach(async function() {
      await click('.spec-add');
    });
    it("adds 2 to the initial value", function() {
      expect($('.spec-number').text()).to.equal('7');
    });
  });

  describe("increment", function() {
    beforeEach(async function() {
      await click('.spec-increment');
    });
    it("increased by 1", function() {
      expect($('.spec-number').text()).to.equal('6');
    });
  });

  describe("decrement", function() {
    beforeEach(async function() {
      await click('.spec-decrement');
    });
    it("increased by 1", function() {
      expect($('.spec-number').text()).to.equal('4');
    });
  });

  describe("multiply", function() {
    beforeEach(async function() {
      await click('.spec-multiply');
    });
    it("multiply by 5", function() {
      expect($('.spec-number').text()).to.equal('25');
    });
  });

  describe("divide", function() {
    beforeEach(async function() {
      await click('.spec-divide');
    });
    it("divide by 5", function() {
      expect($('.spec-number').text()).to.equal('1');
    });
  });

});
