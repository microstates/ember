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
import { setupTest } from 'ember-mocha';

describe('Acceptance: List', function() {
  setupTest();

  beforeEach(async function() {
    await visit('/');
  });

  it('is initialized with members', function() {
    expect($('.spec-list li').length).to.equal(3);
  });

  describe("removing the middle of the list", function() {
    beforeEach(async function() {
      await click($(".spec-remove-item-1"));
    });
    it("gets rid of the middle element", function() {
      expect($('.spec-list li').length).to.equal(2);
      expect($('.spec-list li:first').text()).to.contain('Milk');
      expect($('.spec-list li:last').text()).to.contain('Donuts');
    });
  });

  describe("removing the head of the list", function() {
    beforeEach(async function() {
      await click($(".spec-shift"));
    });
    it("gets rid of the first element", function() {
      expect($('.spec-list li').length).to.equal(2);
      expect($('.spec-list li:first').text()).to.contain('Cereal');
      expect($('.spec-list li:last').text()).to.contain('Donuts');
    });
  });

  describe("removing the end of the list", function() {
    beforeEach(async function() {
      await click($('.spec-pop'));
    });
    it("gets rid of the last element", function() {
      expect($('.spec-list li').length).to.equal(2);
      expect($('.spec-list li:first').text()).to.contain('Milk');
      expect($('.spec-list li:last').text()).to.contain('Cereal');
    });
  });
});
