import Ember from 'ember';
import assign from './utils/assign';
import descriptor from './utils/descriptor';

export default Ember.Helper.extend({

  compute(params, options) {
    this.options = options;
    // collect all of the actions from here up the prototype chain
    let actions = ancestorsOf(this).reduce(function(actions, ancestor) {
      return ancestor.actions ? assign({}, ancestor.actions, actions) : actions;
    }, {});

    let recompute = actions.recompute;
    actions.recompute = ()=> recompute.call(null, this.value, params, options);

    if (!this._update) {
      this.value = this.transition('recompute', actions.recompute);
    }
    delete this._update;

    return this.handlebarsValueFor(decorate(this, actions, this.prototypeFor(this.value), [this.value]), this.value);

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
            return microstate.transition(key, ()=> action.call(null, ...context, ...args));
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

  handlebarsValueFor(value) {
    return value;
  },

  prototypeFor(value) {
    return value;
  },

  transition(eventName, updateFn = (current)=> current) {
    let nextState = updateFn.call(this, this.value);
    if (nextState !== this.value) {
      this.value = nextState;
      this._update = true;
      this.recompute();
      this.sendAction('state', nextState);
      this.sendAction(eventName, nextState);
    }
    return nextState;
  },

  sendAction(name, state) {
    var actionCallback = this.options[Ember.String.dasherize(`on-${name}`)];
    if (actionCallback && actionCallback.call) {
      actionCallback.call(null, state);
    }
  },

  actions: {
    recompute(current, [state = {}]) {
      return state;
    },
    set(current, value) {
      return value;
    }
  }
});

function ancestorsOf(object, ancestors = [object]) {
  let proto = Object.getPrototypeOf(object);
  if (proto == null) {
    return ancestors;
  } else {
    return ancestorsOf(proto, ancestors.concat(proto));
  }
}
