import Ember from 'ember';

export default Ember.assign || function(...objects) {
  return objects.reduce(Ember.merge);
};
