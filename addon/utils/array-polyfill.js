export function find(array, callback, thisArg) {
  if (array.find) {
    return array.find(callback);
  } else {
    for (let i = 0; i < array.length; i++) {
      if (callback.call(thisArg, array[i], i, array)) {
        return array[i];
      }
    }
    return null;
  }
}

export function includes(array, searchElement, fromIndex = 0) {
  if (array.icludes) {
    return array.includes(searchElement, fromIndex);
  } else {
    for (let i = fromIndex; i < array.length; i++) {
      if (searchElement === array[i]) {
        return true;
      }
    }
    return false;
  }
}
