import { helper } from '@ember/component/helper';
import { valueOf } from '../index';

export function valueOfHelper([object]/*, hash*/) {
  return valueOf(object);
}

export default helper(valueOfHelper);
