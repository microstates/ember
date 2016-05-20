/*jshint -W053 */
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  default: 0,

  wrap: function(value) {
    return new Number(value);
  },

  asString: String,

  actions: {
    add(current, amount) {
      return current + amount;
    },
    subtract(current, amount) {
      return current - amount;
    }
  }
});
