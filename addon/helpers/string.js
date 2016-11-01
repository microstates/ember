/*jshint -W053 */
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  initialValueFor([string = '']) {
    if (string == null) {
      return '';
    } else {
      return String(string);
    }
  },

  prototypeFor(value) {
    let wrapped = new String(value);

    Object.defineProperties(wrapped, {
      toString: {
        value() {
          return value;
        }
      },
      valueOf: {
        value() {
          return value;
        }
      },
      isEqual: {
        value(target) {
          return value === target;
        }
      }
    });

    return wrapped;
  }
});
