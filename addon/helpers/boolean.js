import { MicroState } from 'ember-microstates';

const True = Object.create([true], {
  value: { value: true },
  valueOf: {value: ()=> { return true; }},
  toString: {value: ()=> "true" }
});

const False = Object.create([], {
  value: { value: false },
  valueOf: { value: ()=> { return false; } },
  toString: {value: ()=> "false" }
});


export default MicroState.extend({

  initialValueFor([value]) {
    return !!value;
  },

  prototypeFor(value) {
    return value ? True : False;
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
