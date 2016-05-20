import { MicroState } from 'ember-microstates';

export default MicroState.extend({
  default: [],

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
