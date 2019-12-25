import { computed } from "@ember/object";
import { Store } from "../index";

import { stateFrom } from "../-private";

export default function use(typeOrValue, value) {
  return computed({
    get(key) {
      let initial = stateFrom(typeOrValue, value);
      return Store(initial, state => this[key] = state);
    },
    set(key, state) {
      return state;
    }
  });
}
