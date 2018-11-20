import Helper from "@ember/component/helper";
import { computed, observer } from "@ember/object";
import { Store } from "../index";
import { stateFrom } from "../-private";

export default Helper.extend({
  state: computed("typeOrValue", "value", {
    get() {
      let typeOrValue = this.get("typeOrValue");
      let value = this.get("value");
      
      let initial = stateFrom(typeOrValue, value);

      return Store(initial, state => this.set("state", state));
    },
    set(key, state) {
      return state;
    }
  }),

  stateDidChange: observer("state", function() {
    this.recompute();
  }),

  compute([typeOrValue, value]) {
    this.setProperties({
      typeOrValue,
      value
    });

    return this.get("state");
  }
});
