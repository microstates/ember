import Helper from '@ember/component/helper';
import { computed, observer } from '@ember/object';
import { from, Store } from 'microstates/dist/microstates.cjs';

export default Helper.extend({
  
  state: computed('value', {
    get(key) {
      let value = this.get('value');

      return Store(from(value), state => this.set(key, state));
    },
    set(key, state) {
      return state;
    }
  }),

  stateDidChange: observer('state', function() {
    this.recompute();
  }),

  compute([value]) {
    // Objects created with Object.create(null) don't have a prototype,
    // detect this and spread them to Object. Should be fixed in Microstates.
    this.set('value', value && Object.getPrototypeOf(value) === null ? {...value} : value);

    return this.get('state');
  }
});