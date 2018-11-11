import { computed } from '@ember/object';
import { create, Store, Any } from 'microstates/dist/microstates.cjs';

export default function useType(Type = Any, value) {
  return computed({
    get(key) {
      return Store(create(Type, value), state => this.set(key, state));
    },
    set(key, state) {
      return state;
    }
  })
}