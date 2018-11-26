// BEGIN-SNIPPET array-of-numbers
// file in app/types/array-of-numbers.js
import { ArrayType, NumberType } from '@microstates/ember';

export default ArrayType.of(NumberType);
// END-SNIPPET