import { assign, merge } from '@ember/polyfills';

export default assign || function(...objects) {
  return objects.reduce(merge);
};
