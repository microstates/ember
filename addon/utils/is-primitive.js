export default function isPrimitive(value) {
  let type = typeof value;
  return type != "object" && type != "function";
}