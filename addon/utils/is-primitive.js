export default function isPrimitive(value) {
  if (value == null) {
    return true;
  } else {
    let type = typeof value;
    return type != "object" && type != "function";
  }
}