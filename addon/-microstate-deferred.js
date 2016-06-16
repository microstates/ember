import { task } from 'ember-concurrency';

import sendActionNotification from './utils/send-action-notification';
import assign from './utils/assign';
import Microstate from './-microstate';

export default Microstate.extend({

  task: task(function * (eventName, promise) {
    try {
      let nextState = yield promise;
      this._deferredState = complete();
      this.transition(eventName, () => nextState);
    } catch (e) {
      this._deferredState = error(e);
      this.transition(eventName, () => this.value );
    } finally {
      // TODO: what should happen here?
    }
  }).restartable().keepLatest(),

  compute() {
    let value = this._super(...arguments);

    if (this._deferredState) {
      value = assign(value, this._deferredState);
      this._deferredState = null;
      return value;
    }

    return value;
  },

  transition(eventName, updateFn = (current)=> current) {
    if (arguments.length === 1) {
      updateFn = eventName || (o=> o);
      eventName = null;
    }

    let nextState = updateFn.call(this, this.value);

    // nextState is a promise, we need to allow the promise to resolve before finishing the transition
    if (isThenable(nextState)) {
      this._deferredState = pending();
      if (eventName === 'recompute') {
        eventName = 'recomputePromise';
      }
      this.get('task').perform(eventName, nextState);
      // we shouldn't change the value yet, so let's reset it back to previous value
      nextState = this.value;
      this._update = true;
      this.recompute();
    } else if (eventName === 'recompute') {
      this._deferredState = initial();
      this.recompute();
      return nextState;
    }

    // when nextState is a promise, this code should not execute
    if (nextState !== this.value) {
      this._deferredState = complete();
      this.value = nextState;
      this._update = true;
      this.recompute();
      sendActionNotification(this, 'state', nextState);

      if (eventName) {
        sendActionNotification(this, eventName, nextState);
      }
    }

    return nextState;
  }

});

function initial() {
  return {
    error: null,
    isNew: true,
    isError: false,
    isPending: false,
    isComplete: false
  };
}

function complete() {
  return {
    error: null,
    isNew: false,
    isError: false,
    isPending: false,
    isComplete: true
  };
}

function pending() {
  return {
    error: null,
    isNew: false,
    isError: false,
    isPending: true,
    isComplete: false
  };
}

function error(error) {
  return {
    error,
    isNew: false,
    isError: true,
    isPending: false,
    isComplete: true
  };
}

function isThenable(value) {
  return value && value.then && value.then.call;
}