import Ember from 'ember';
import { task } from 'ember-concurrency';
import assign from '../utils/assign';

export default Ember.Mixin.create({

  task: task(function * (eventName, promise) {
    try {
      let nextState = yield promise;
      this.transition('success', () => nextState);
      return nextState;
    } catch (e) {
      this.transition('error', e => e );
    } finally {
      // TODO: what should happen here?
    }
  }).restartable().keepLatest(),

  setState(eventName, nextState) {

    if (isThenable(nextState)) {
      this.transition('pending', () => this.value );
      this.get('task').perform(eventName, nextState);
      return;
    }

    this._super(...arguments);
  },

  actions: {
    recompute(current, [value = {}]) {
      return assign(value, {
        error: null,
        isError: false,
        isPending: true,
        isComplete: false
      });
    },
    success(current, value) {
      return assign(this.wrap(value), {
        error: null,
        isError: true,
        isPending: false,
        isComplete: true
      });
    },
    pending(current) {
      return assign(current, {
        error: null,
        isError: false,
        isPending: true,
        isComplete: false
      });
    },
    error(current, error) {
      return assign(this.wrap(current), {
        error,
        isError: true,
        isPending: false,
        isComplete: true
      });
    }
  }

});

function isThenable(value) {
  return value && value.then && value.then.call;
}