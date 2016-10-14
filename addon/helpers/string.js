/*jshint -W053 */
import { MicroState } from 'ember-microstates';

const {
  defineProperty
} = Object;

export default MicroState.extend({

  wrap(value) {
    let wrapped = new String(value);

    defineProperty(wrapped, 'toString', {
      value() {
        return value;
      }
    });

    defineProperty(wrapped, 'valueOf', {
      value() {
        return value;
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
