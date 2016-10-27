import Ember from 'ember';
import assign from './utils/assign';
import descriptor from './utils/descriptor';

export default Ember.Helper.extend({

  compute(params, options) {
    this.options = options;
    // collect all of the transitions from here up the prototype chain
    let transitions = ancestorsOf(this).reduce(function(transitions, ancestor) {
      return ancestor.transitions ? assign({}, ancestor.transitions, transitions) : transitions;
    }, {});

    if (!this._update) {
      this.value = this.initialValueFor(params, options);
    }
    delete this._update;

    return this.handlebarsValueFor(decorate(this, transitions, this.prototypeFor(this.value), [this.value]), this.value);

    function decorate(microstate, transitions, object, context) {
      return Object.create(object, Object.keys(transitions).reduce((values, key)=> {
        return assign(values, {
          [key]: descriptor(valueFor(transitions, key))
        });
      }, {}));

      function valueFor(transitions, key) {
        let action = transitions[key];
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

  /**
   * initialValueFor hook is used to coerce params value into 
   * type that the microstate expects. It's called when the helper 
   * is computed the first time or consequently when incoming parameters 
   * or arguments change.  
   */
  initialValueFor([value]) {
    return value;
  },

  /**
   * prototypeFor hook provides the prototype for the object that 
   * will be exposed to the template.
   */
  prototypeFor(value) {
    return value;
  },

  /**
   * handlebarsValueFor hooks is used to provide value that is formatted 
   * to accomidate specificies of Handlebars.
   */
  handlebarsValueFor(value) {
    return value;
  },

  transition(eventName, updateFn = (current)=> current) {
    let nextState = updateFn.call(this, this.value);
    if (nextState !== this.value) {
      this.value = nextState;
      this._update = true;
      this.recompute();
      this.sendAction('transition', nextState);
      this.sendAction(eventName, nextState);
    }
    return nextState;
  },

  sendAction(name, state) {
    let actionCallback = this.options[Ember.String.dasherize(`on-${name}`)];
    if (actionCallback && actionCallback.call) {
      actionCallback.call(null, state);
    }
  },

  transitions: {
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
