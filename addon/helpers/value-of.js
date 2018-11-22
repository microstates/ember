import { helper } from '@ember/component/helper';
import { valueOf } from '../index';

export default helper(([object]) => valueOf(object));
