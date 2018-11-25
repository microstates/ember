// BEGIN-SNIPPET todomvc-component-javascript
import Component from '@ember/component';
import { state } from '@microstates/ember';
import TodoMVC from '../types/todomvc';

const initial = {
  title: 'todos',
  todos: [
    { id: 0, text: 'Checkout Microstates demo', completed: true },
    { id: 1, text: 'Try Microstates in a side project', completed: false },
    { id: 2, text: 'Use Microstates in a real app', completed: false }
  ]
}

export default Component.extend({
  tagName: '',
  todomvc: state(TodoMVC, initial)
});
// END-SNIPPET