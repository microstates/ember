import { computed } from '@ember/object';
import { create, Store } from '../index';

export default function use(microstate = create()) {
  return computed({
    get(key) {
      return Store(microstate, state => this.set(key, state));
    },
    set(key, state) {
      return state;
    }
  })
}