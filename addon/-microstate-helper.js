import Ember from 'ember';
import MicroState from './-observable-microstate';

export default Ember.Helper.extend({

  subscription: { unsubscribe() {} },

  compute([value], options) {
    // we're recomputing because of a newly observed state.
    if (this.didMakeObservation) {
      delete this.didMakeObservation;
      return this.current;
    } else {
      //we're recomputing because the inputs changed.
      this.subscription.unsubscribe();
      let microstate = new MicroState(value, this);

      this.subscription = microstate.subscribe(transition => {
        this.didMakeObservation = true;
        this.current = transition.state;
        this.recompute();
        sendEvent(this, 'state', transition, options);
        sendEvent(this, transition.actionName, transition, options);
      });
      return this.subscription.initial;
    }
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
