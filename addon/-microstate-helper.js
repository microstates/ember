import Ember from 'ember';
import MicroState from './-microstate';

export default Ember.Helper.extend({

  subscription: { unsubscribe() {} },

  compute(params, options) {
    // we're recomputing because of a newly observed state.
    if (this.didMakeObservation) {
      delete this.didMakeObservation;
      return this.current;
    } else {
      //we're recomputing because the inputs changed.
      this.subscription.unsubscribe();
      let microstate = new MicroState(this.construct(params, options), this);

      this.subscription = microstate.subscribe(transition => {
        this.didMakeObservation = true;
        this.current = transition.state;
        this.recompute();
        sendEvent(this, 'state', transition, options);
        sendEvent(this, transition.actionName, transition, options);
      });
      return this.subscription.initial;
    }
  },

  /**
   * Adapts the helper api, and converts the params and options into
   * a value to be passed into the microstate.
   */
  construct([value] /*, options*/) {
    return value;
  }
});

function sendEvent(object, name, transition, options) {
  let args = [transition.next, transition.previous, transition.state, transition];
  Ember.sendEvent(object, name, args);
  let action = options[`on-${name}`];
  if (action) {
    action.call(null, ...args);
  }
}
