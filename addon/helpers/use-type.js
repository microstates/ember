import Helper from '@ember/component/helper';
import { computed, observer } from '@ember/object';
import { create, Store, Any } from 'microstates/dist/microstates.cjs';

export default Helper.extend({
  
  state: computed('Type', 'value', {
    get(key) {
      let Type = this.get('Type');
      let value = this.get('value');

      return Store(create(Type, value), state => this.set(key, state));
    },
    set(key, state) {
      return state;
    }
  }),

  stateDidChange: observer('state', function() {
    this.recompute();
  }),

  compute([Type = Any, value]) {
    this.setProperties({
      Type,
      value,
    })

    return this.get('state');
  }
});