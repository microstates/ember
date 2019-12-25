// BEGIN-SNIPPET todomvc-component-javascript
import Component from "@glimmer/component";
import { state } from '@microstates/ember';
import TodoMVCType from "../types/todomvc";

const initial = {
  title: "todos",
  todos: [
    { id: 0, text: "Checkout Microstates demo", completed: true },
    { id: 1, text: "Try Microstates in a side project", completed: false },
    { id: 2, text: "Use Microstates in a real app", completed: false }
  ]
};

export default class Todo extends Component {
  // this property is overwritten when context controls the state
  @state(TodoMVCType, initial)
  todomvc;

  constructor() {
    super(...arguments);
    if (this.args.todomvc) {
      this.todomvc = this.args.todomvc;
    }
  }
}
// END-SNIPPET
