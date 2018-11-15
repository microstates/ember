import { computed } from '@ember/object';
import { from, Store } from 'microstates/dist/microstates.cjs';

export default function useType(value) {
  return computed({
    get(key) {
      return Store(from(value), state => this.set(key, state));
    },
    set(key, state) {
      return state;
    }
  })
}