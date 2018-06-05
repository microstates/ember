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

describe('Acceptance: SingleSelect', function() {
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

  it("has entries for each select", function() {
    expect($('.spec-select-Horse').length).to.equal(1);
    expect($('.spec-select-Cow').length).to.equal(1);
    expect($('.spec-select-Lizard').length).to.equal(1);
  });

  it("honors the initial selection", function() {
    expect($('.spec-select-Horse').prop('checked')).to.equal(false);
    expect($('.spec-select-Cow').prop('checked')).to.equal(true);
    expect($('.spec-select-Lizard').prop('checked')).to.equal(false);
  });
  describe("clicking on the lizard input", function() {
    beforeEach(async function() {
      await click('.spec-select-Lizard');
    });
    it("selects the lizard checkbox", function() {
      expect($('.spec-select-Lizard').prop('checked')).to.equal(true);
    });
    it("unselects the cow checkbox", function() {
      expect($('.spec-select-Cow').prop('checked')).to.equal(false);
    });
  });
});
