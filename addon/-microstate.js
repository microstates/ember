import assign from './utils/assign';
import descriptor from './utils/descriptor';
import ancestorsOf from './utils/ancestors-of';
import { Observable } from './utils/observable';

export default class MicroState {
  constructor(value, attrs = this) {
    this[Symbol.observable] = new Observable(observer => {
      let actions = ancestorsOf(attrs).reduce(function(actions, ancestor) {
        return ancestor.actions ? assign({}, ancestor.actions, actions) : actions;
      }, {
        set(current, value) {
          return value;
        },
        reset() {
          return value;
        }
      });

      let wrap = attrs.wrap || (o=> o);
      observer._subscription.initial = decorate(value, wrap(value), actions, [value]);

      function decorate(val, prototype, properties, context) {

        return Object.create(prototype, Object.keys(properties).reduce((values, key)=> {
          return assign(values, {[key]: descriptor(valueFor(properties, key))});
        }, {
          toString: descriptor(()=> val == null ? String(val) : val.toString()),
          valueOf: descriptor(()=> val)
        }));

        function valueFor(attrs, key) {
          let action = attrs[key];
          if (typeof action === 'function') {
            return function(...args) {
              let next = action.call(attrs, ...context, ...args);
              return observer.next({
                actionName: key,
                previous: val,
                next,
                state: decorate(next, wrap(next), actions, [next])
              });
            };
          } else {
            let child = val[key];
            if (child.map && child.length >= 0) {
              return child.map(val => decorate(val, val, action, context.concat(val)));
            } else {
              return decorate(child, child, action, context.concat(child));
            }
          }
        }
      }
    });
  }

  subscribe() {
    return this[Symbol.observable].subscribe(...arguments);
  }

  wrap(value) {
    return value;
  }
}
