/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import $ from 'jquery';

describe('Acceptance: String', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function() {
    visit("/");
  });
  it("initializes with a value", function() {
    expect($('.spec-string').text()).to.equal('"a string"');
  });

  describe("entering in some text and then hitting return", function() {
    beforeEach(function() {
      fillIn('.spec-string-input', 'another string');
    });
    it("updates to the new value", function() {
      expect($('.spec-string').text()).to.equal('"another string"');
    });
  });

});
