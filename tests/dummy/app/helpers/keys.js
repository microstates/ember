import { helper } from '@ember/component/helper';

export default helper(function([object]) {
  return Object.keys(object);
});