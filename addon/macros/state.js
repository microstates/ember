import { set } from "@ember/object";
import macro from 'macro-decorators';
import { Store } from "../index";

import { stateFrom } from "../-private";

export default function use(typeOrValue, value) {
  debugger;
  return macro({
    get(key) {
      let initial = stateFrom(typeOrValue, value);
      return Store(initial, state => set(this, key, state));
    },
    set(key, state) {
      return state;
    }
  });
}
