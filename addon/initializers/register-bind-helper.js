import Ember from 'ember';
const { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');

export default {
  name: 'register-bind-helper',
  initialize: function registerBindHelper() {
    registerHelper('bind', function bindHelper(params, hash, options) {
      options.template.yield(params);
    });
  }
};
