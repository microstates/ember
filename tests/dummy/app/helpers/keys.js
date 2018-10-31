import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function([object]) {
  return Object.keys(object);
});