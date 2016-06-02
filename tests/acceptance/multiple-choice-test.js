/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Multiple', function() {
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
    expect($('.spec-multiple-choice-Horse').length).to.equal(1);
    expect($('.spec-multiple-choice-Cow').length).to.equal(1);
    expect($('.spec-multiple-choice-Lizard').length).to.equal(1);
  });

  it("honors the initial selection", function() {
    expect($('.spec-multiple-choice-Horse').prop('checked')).to.equal(true);
    expect($('.spec-multiple-choice-Cow').prop('checked')).to.equal(false);
    expect($('.spec-multiple-choice-Lizard').prop('checked')).to.equal(false);
  });
  describe("clicking on the lizard input", function() {
    beforeEach(function() {
      click('.spec-multiple-choice-Lizard');
    });
    it("selects the lizard checkbox", function() {
      expect($('.spec-multiple-choice-Lizard').prop('checked')).to.equal(true);
    });
    it("keeps the horse checkbox checked", function() {
      expect($('.spec-multiple-choice-Horse').prop('checked')).to.equal(true);
    });
  });
});
