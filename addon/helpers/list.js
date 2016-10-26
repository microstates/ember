import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  initialValueFor([array]) {
    if (array === undefined) {
      return [];
    } else if (array instanceof Array) {
      return array;
    } else if (array && typeof array !== 'string' && array.length != null) {
      return array;
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

  actions: {
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
