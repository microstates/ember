/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: SingleChoice', function() {
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

  it("has entries for each choice", function() {
    expect($('.spec-choice-Horse').length).to.equal(1);
    expect($('.spec-choice-Cow').length).to.equal(1);
    expect($('.spec-choice-Lizard').length).to.equal(1);
  });

  it("honors the initial selection", function() {
    expect($('.spec-choice-Horse').prop('checked')).to.equal(false);
    expect($('.spec-choice-Cow').prop('checked')).to.equal(true);
    expect($('.spec-choice-Lizard').prop('checked')).to.equal(false);
  });
  describe("clicking on the lizard input", function() {
    beforeEach(function() {
      click('.spec-choice-Lizard');
    });
    it("selects the lizard checkbox", function() {
      expect($('.spec-choice-Lizard').prop('checked')).to.equal(true);
    });
    it("unselects the cow checkbox", function() {
      expect($('.spec-choice-Cow').prop('checked')).to.equal(false);
    });
  });
});
