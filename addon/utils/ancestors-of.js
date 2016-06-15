export default function ancestorsOf(object, ancestors = [object]) {
  let proto = Object.getPrototypeOf(object);
  if (proto == null) {
    return ancestors;
  } else {
    return ancestorsOf(proto, ancestors.concat(proto));
  }
}