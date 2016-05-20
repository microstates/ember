/*jshint -W053 */
import { MicroState } from 'ember-microstates';

export default MicroState.extend({
  default: "",

  wrap(value) {
    return new String(value);
  },

  asString: String,

  actions: {
    set(string, value) {
      return String(value);
    }
  }
});
