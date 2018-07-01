import Service from '@ember/service';
import { use } from 'microstates';

/**
 * Creates a service using the provided Microstate
 * 
 * @param {Microstate} initial Microstate instance
 * @returns {Ember.Service} The service backed by the given microstate
 */
export default function createService(initial) {
  return Service.extend({
    init() {
      this._super(...arguments);

      let middleware = next => (microstate, transition, args) => {
        // when a transition is called, compute the next microstate
        let nextMicrostate = next(microstate, transition, args);

        // set the internal state to the next state
        this.set('microstate', nextMicrostate);

        return nextMicrostate;
      };

      // map the initial microstate and add the middleware into the tree
      let withMiddleware = use(middleware, initial);

      // set the services state to microstate with middleware in it
      this.set('microstate', withMiddleware);
    }
  });
}