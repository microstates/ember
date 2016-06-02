import Ember from 'ember';

const IS_EMBER_1 = Ember.VERSION.split(".").shift() === "1";

export default Ember.Helper.extend({

  default: {},

  initialize(value) {
    return value;
  },

  compute([value = this.default], options) {
    this.options = options;
    if (!this.value || !this._update) {
      this.value = this.initialize(value, options);
    }
    delete this._update;
    let current = this.value;
    let actions = Object.keys(this.actions).reduce((actions, key)=> {
      actions[key] = {
        value: (...args)=> {
          let action = this.actions[key];
          return this.setState(key, (curr) => action.call(null, curr, ...args));
        },
        // If this is Ember < 2, we want to make this property re-configurable
        // so that it can add a setter when embedded in handlebars. This setter
        // should never be used, but will keep the handlebars templates from
        // barking.
        configurable: IS_EMBER_1 ? true : false
      };
      return actions;
    }, {});

    return Object.create(this.wrap(current), actions);
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

  actions: {}
});

function sendActionNotification(helper, actionName, state) {
  var actionCallback = helper.options[Ember.String.dasherize(`on-${actionName}`)];
  Ember.sendEvent(helper, actionName, [state]);
  if (actionCallback && actionCallback.call) {
    actionCallback.call(null, state);
  }
}
