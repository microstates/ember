import { MicroState } from 'ember-microstates';
import assign from '../utils/assign';
import { reduceObject } from '../utils/object-utils';

export default MicroState.extend({

  prototypeFor(value) {
    return assign({}, value);
  },

  handlebarsValueFor(object, value) {
    return reduceObject(value, function(result, name, value) {
      return assign(result, {
        [name]: value
      });
    }, object);
  },

  actions: {
    recompute(current, params, options) {
      return options;
    },
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
