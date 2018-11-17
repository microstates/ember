/**
 * Objects created with Object.create(null) don't have a prototype,
 * detect this and spread them to Object. Should be fixed in Microstates.
 */
export function ensurePrototype(value) {
  if (value && Object.getPrototypeOf(value) === null) {
    return { ...value };
  } else {
    return value;
  }
}
