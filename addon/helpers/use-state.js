import Helper from "@ember/component/helper";
import { computed, observer } from "@ember/object";
import { from, Store } from "../index";
import { ensurePrototype } from "../-private";

export default Helper.extend({
  state: computed("value", {
    get() {
      let value = ensurePrototype(this.get("value"));

      return Store(from(value), state => this.set('state', state));
    },
    set(key, state) {
      return state;
    }
  }),

  stateDidChange: observer("state", function() {
    this.recompute();
  }),

  compute([value]) {
    this.set("value", value);

    return this.get("state");
  }
});
