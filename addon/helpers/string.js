/*jshint -W053 */
import { MicroState } from 'ember-microstates';
import assign from '../utils/assign';

export default MicroState.extend({

  wrap(value) {
    return assign(new String(value), {
      toString() { return value; }
    });
  },

  actions: {
    set(string, value) {
      return String(value);
    }
  }
});
