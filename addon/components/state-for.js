import Component from '@ember/component';
import layout from '../templates/components/state-for';
import { create, use } from 'microstates';

const StateFor = Component.extend({
  tagName: '',
  layout,

  init() {
    this._super(...arguments);

    let onchange = this.get('onchange');
    let type = this.get('type');
    let value = this.get('value');

    // create initial microstate from type and value
    let initial = create(type, value);

    let middleware = next => (microstate, transition, args) => {
      // when a transition is called, compute the next microstate
      let nextMicrostate = next(microstate, transition, args);
      
      // If onchange action is defined call it with the new state
      if (typeof onchange === 'function') {
        let value = nextMicrostate.valueOf();
        onchange(value);
      }

      // set the internal state of the component to the next state
      this.set('microstate', nextMicrostate);

      return nextMicrostate;
    };

    // map the initial microstate and add the middleware into the tree
    let withMiddleware = use(middleware, initial);

    // set the components state to microstate with middleware in it
    this.set('microstate', withMiddleware);
  }
});

StateFor.reopenClass({
  positionalParams: ['type']
});

export default StateFor;
