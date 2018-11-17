import Helper from '@ember/component/helper';
import { computed, observer } from '@ember/object';
import { create, Store } from '../index';
import { ensurePrototype } from '../-private';

export default Helper.extend({
  
  state: computed('Type', 'value', {
    get() {
      let Type = this.get('Type');
      let value = ensurePrototype(this.get('value'));

      return Store(create(Type, value), state => this.set('state', state));
    },
    set(key, state) {
      return state;
    }
  }),

  stateDidChange: observer('state', function() {
    this.recompute();
  }),

  compute([Type, value]) {
    this.setProperties({
      Type,
      value,
    })

    return this.get('state');
  }
});