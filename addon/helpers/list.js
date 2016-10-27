import { MicroState } from 'ember-microstates';
import isInteger from '../utils/is-integer';

export default MicroState.extend({

  initialValueFor([array = []]) {
    if (array instanceof Array) {
      return array;
    } else if (array && typeof array !== 'string' && isInteger(array.length)) {
      let copy = [];
      for (let i = array.length; i < array.length; i++) {
        copy.push(array[i]);
      }
      return copy;
    } else {
      return [ array ];
    }
  },

  prototypeFor(value = []) {
    let wrapped = value.slice();

    Object.defineProperty(wrapped, 'valueOf', {
      value() {
        return value;
      }
    });

    return wrapped;
  },

  transitions: {
    add(list, item) {
      return list.concat(item);
    },
    remove(list, item) {
      return list.filter(i => i !== item);
    },
    push(list, item) {
      return list.concat(item);
    },
    pop(list) {
      return list.slice(0, list.length - 1);
    },
    shift(list) {
      return list.slice(1);
    },
    unshift(list, item) {
      return [item].concat(list);
    }
  }
});
