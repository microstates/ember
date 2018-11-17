import { computed } from '@ember/object';
import { create, Store } from '../index';

export default function useType(Type, value) {
  return computed({
    get(key) {
      return Store(create(Type, value), state => this.set(key, state));
    },
    set(key, state) {
      return state;
    }
  })
}