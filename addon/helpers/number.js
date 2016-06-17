/*jshint -W053 */
import MicroStateHelper  from 'ember-microstates/-microstate-helper';

export default MicroStateHelper.extend({

  wrap: function(value) {
    return new Number(value);
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
