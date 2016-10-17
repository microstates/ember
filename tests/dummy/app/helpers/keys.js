import Ember from 'ember';

export default Ember.Helper.helper(function([object]) {
  return Object.keys(object);
});