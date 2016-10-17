/*jshint -W053 */
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  prototypeFor(value) {
    let wrapped = new String(value);

    Object.defineProperties(wrapped, {
      toString : {
        value() {
          return value;
        }
      },
      valueOf: {
        value() {
          return value;
        }
      }
    });

    return wrapped;
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
