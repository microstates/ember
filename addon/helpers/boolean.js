import { MicroState } from 'ember-microstates';

const True = Object.create([true], {
  value: { value: true },
  valueOf: {value: ()=> { return true; }},
  toString: {value: ()=> "true" },
  isEqual: { value: (target)=> true === !!target }  
});

const False = Object.create([], {
  value: { value: false },
  valueOf: { value: ()=> { return false; } },
  toString: { value: ()=> "false" },
  isEqual: { value: (target)=> false === !!target }
});


export default MicroState.extend({

  initialValueFor([value]) {
    return !!value;
  },

  prototypeFor(value) {
    return value ? True : False;
  },

  transitions: {
    toggle(current) {
      return !current;
    },
    set(current, value) {
      return !!value;
    }
  }
});
