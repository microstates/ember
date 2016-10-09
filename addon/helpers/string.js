/*jshint -W053 */
import { MicroState } from 'ember-microstates';
import assign from '../utils/assign';

export default MicroState.extend({

  wrap(value) {
    return assign(new String(value), {
      toString() { return value; },
      valueOf() { return value; }
    });
  },

  actions: {
    recompute(previous, [string = '']) {
      return string;
    },

    set(string, value) {
      return String(value);
    }
  }
});
