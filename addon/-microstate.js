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
    let current = this.value;
    let actions = Object.keys(this.actions).reduce((actions, key)=> {
      return assign(actions, {
        [key]: descriptor((...args)=> {
          let action = this.actions[key];
          return this.setState(key, (curr) => action.call(null, curr, ...args));
        })
      });
    }, {});

    let collections = Object.keys(this.each).reduce((collections, collectionName)=> {
      return assign(collections, {
        [collectionName]: descriptor(current[collectionName].map((member)=> {
          return Object.create(member, Object.keys(this.each[collectionName]).reduce((actions, key)=> {
            return assign(actions, {
              [key]: descriptor((...args)=> {
                let action = this.each[collectionName][key];
                return this.setState(`${key}-{Ember.String.singularize(collectionName)}`, (curr)=> action.call(null, curr, member, ...args));
              })
            });
          }, {}));
        }))
      });
    }, {});
    return Object.create(this.wrap(current), assign({}, actions, collections));
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

    if (isThenable(nextState)) {
      nextState.then((nextState)=>{
        this.transitionState(eventName, nextState);
      });
      return this.value;
    }

    return this.transitionState(eventName, nextState);
  },

  transitionState(eventName, nextState) {
    if (nextState !== this.value) {
      this.value = nextState;
      this.recompute();
      sendActionNotification(this, 'state', nextState);

      if (eventName) {
        sendActionNotification(this, eventName, nextState);
      }
    }
    return nextState;
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

function isThenable(value) {
  return value && value.then && value.then.call;
}
