/*jshint -W053 */
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  initialValueFor([string]) {
    if (string === undefined || string === null) {
      return '';
    } else if (string && string.toString) {
      return string.toString();
    } else {
      return string;
    }
  },

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
  }
});
