import { VERSION } from '@ember/version';
const IS_EMBER_1 = VERSION.split(".").shift() === "1";

/**
 * Takes a single static value and makes a property descriptor that
 * can be used with `Object.create` or `Object.defineProperty`. E.g.
 *
 *   let object = Object.create({}, {
 *     foo: descriptor('bar'),
 *     baz: descriptor('bang),
 *   });
 *
 *   object.foo //=> 'bar'
 *   object.bar //=> 'baz'
 *
 * Ember 1.x freeks out if it can't install setters on any object, so
 * in that case, we actually make the descriptor configurable so it
 * can be happy and add a setter.
 *
 * @param {Object} - the value of the property.
 * @return {Object} - a property descriptor for this static value
 */
export default function descriptor(value) {
  return {
    value,
    // If this is Ember < 2, we want to make this property re-configurable
    // so that it can add a setter when embedded in handlebars. This setter
    // should never be used, but will keep the handlebars templates from
    // barking.
    configurable: IS_EMBER_1 ? true : false
  };
}
