/*jshint -W053 */
import Ember from 'ember';
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  default: 0,

  wrap: function(value) {
    return Ember.assign(new Number(value), {
      toString() { return String(value); }
    });
  },

  actions: {
    add(current, amount) {
      return current + amount;
    },
    subtract(current, amount) {
      return current - amount;
    }
  }
});
