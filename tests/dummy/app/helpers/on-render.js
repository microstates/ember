import { helper } from '@ember/component/helper';

export default helper(function([fn, arg]) {
  return fn(arg);
});