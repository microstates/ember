import Ember from 'ember';
import assign from './utils/assign';
import descriptor from './utils/descriptor';

export default Ember.Helper.extend({

  initialize(previous, [value = {}]) {
    return value;
  },

  compute(params, options) {
    this.options = options;
    if (!this._update) {
      this.value = this.initialize(this.value, params, options);
    }
    delete this._update;

    return decorate(this, this.actions, this.wrap(this.value), [this.value]);

    function decorate(microstate, actions, object, context) {
      return Object.create(object, Object.keys(actions).reduce((values, key)=> {
        return assign(values, {
          [key]: descriptor(valueFor(actions, key))
        });
      }, {}));

      function valueFor(actions, key) {
        let action = actions[key];
        if (typeof action === 'function') {
          return function(...args) {
            return microstate.setState(key, ()=> action.call(null, ...context, ...args));
          };
        } else {
          let next = object[key];
          if (next.map && next.length >=0) {
            return next.map(val => decorate(microstate, action, val, context.concat(val)));
          } else {
            return decorate(microstate, action, next, context.concat(next));
          }
        }
      }
    }
  },

  wrap(value) {
    return value;
  },

  setState(eventName, updateFn = (current)=> current) {
    if (arguments.length === 1) {
      updateFn = eventName || (o=> o);
      eventName = null;
    }

    this._update = true;
    var nextState = updateFn.call(this, this.value);
    if (nextState !== this.value) {
      this.value = nextState;
      this.recompute();
      sendActionNotification(this, 'state', nextState);

      if (eventName) {
        sendActionNotification(this, eventName, nextState);
      }
    }
    return this.value;
  },

  each: {},
  actions: {}
});

function sendActionNotification(helper, actionName, state) {
  var actionCallback = helper.options[Ember.String.dasherize(`on-${actionName}`)];
  Ember.sendEvent(helper, actionName, [state]);
  if (actionCallback && actionCallback.call) {
    actionCallback.call(null, state);
  }
}
