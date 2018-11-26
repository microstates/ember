// BEGIN-SNIPPET array-of-todomvc
// file in app/types/array-of-todomvc.js
import { ArrayType } from '@microstates/ember';
import TodoMVC from './todomvc';

export default ArrayType.of(TodoMVC);
// END-SNIPPET