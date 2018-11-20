import { create, from } from "./index";

export function stateFrom(typeOrValue, value) {
  if (typeOrValue && typeOrValue.constructor && typeOrValue.constructor.Type) {
    // already a microstate
    return typeOrValue;
  } else if (typeof typeOrValue === "function") {
    return create(typeOrValue, value);
  } else {
    return from(typeOrValue);
  }
}