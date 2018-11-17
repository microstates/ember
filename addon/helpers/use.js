import Helper from "@ember/component/helper";
import { computed, observer } from "@ember/object";
import { create, Store } from "../index";

export default Helper.extend({
  state: computed("value", {
    get() {
      let microstate = this.get('microstate');

      return Store(microstate, state => this.set('state', state));
    },
    set(key, state) {
      return state;
    }
  }),

  stateDidChange: observer("state", function() {
    this.recompute();
  }),

  compute([microstate = create()]) {
    this.set('microstate', microstate);

    return this.get("state");
  }
});
