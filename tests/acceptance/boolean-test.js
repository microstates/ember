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

describe('Acceptance: Boolean', function() {
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

  it("shows the initial boolean state", function() {
    expect($('.spec-boolean-value').text()).to.equal('false');
  });
  describe("hitting the toggle button", function() {
    beforeEach(function() {
      click('.spec-toggle');
    });
    it("changes the boolean state to true", function() {
      expect($('.spec-boolean-value').text()).to.equal('true');
    });
  });
  describe("hitting the set true button", function() {
    beforeEach(function() {
      click('.spec-set-true');
    });
    it("changes the boolean state to true", function() {
      expect($('.spec-boolean-value').text()).to.equal('true');
    });
  });
  describe("hitting the set false button", function() {
    beforeEach(function() {
      click('.spec-set-false');
    });
    it("has no effect", function() {
      expect($('.spec-boolean-value').text()).to.equal('false');
    });
  });
});
