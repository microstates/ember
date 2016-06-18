import { MicroStateHelper } from 'ember-microstates';

const True = [true];

const False = [];

export default MicroStateHelper.extend({

  construct([value = false]) {
    return !!value;
  },

  wrap(value) {
    return !!value ? True : False;
  },

  actions: {
    toggle(current) {
      return !current;
    },
    set(current, value) {
      return !!value;
    }
  }
});
