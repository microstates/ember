import { MicroState } from 'ember-microstates';
import assign from '../utils/assign';
import { reduceObject } from '../utils/object-utils';

export default MicroState.extend({

  initialValueFor([object = {}]) {
    return object;
  },

  /**
   * Make all of the object properties explicitly enumerable in the template
   * 
   * Handlebars helpers like `each-in` use `Object.keys` to iterate object properties. `Object.keys` returns
   * only properties must be owned by the object. This hook will assign each value's property onto the object,
   * to ensure that it can be retrieved with `Object.keys`.
   */
  handlebarsValueFor(object, value) {
    return reduceObject(value, function(result, name, value) {
      return assign(result, {
        [name]: value
      });
    }, object);
  },

  actions: {
    delete(current, target) {
      return reduceObject(current, function(result, name, value) {
        if (target === name) {
          return result;          
        } else {
          return assign(result, {
            [name]: value
          });
        }
      });
    },
    assign(current, object={}) {
      return assign({}, current, object);
    },
    put(current, property, value) {
      return assign({}, current, {
        [property]: value
      });
    }
  }
});
