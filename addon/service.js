import Service from '@ember/service';
import { create, use } from 'microstates';

export default Service.extend({
  init() {
    this._super(...arguments);

    let type = this.typeClass;
    let value = this.defaultValue() || {};

    // create initial microstate from type and value
    let initial = create(type, value);

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