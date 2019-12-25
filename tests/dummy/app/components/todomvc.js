// BEGIN-SNIPPET todomvc-component-javascript
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { create, Store } from '@microstates/ember';
import TodoMVCType from "../types/todomvc";

const initial = {
  title: "todos",
  todos: [
    { id: 0, text: "Checkout Microstates demo", completed: true },
    { id: 1, text: "Try Microstates in a side project", completed: false },
    { id: 2, text: "Use Microstates in a real app", completed: false }
  ]
};
let microstate = create(TodoMVCType, initial);


export default class Todo extends Component {
  @tracked todomvc;

  constructor() {
    super(...arguments);
    if (this.args.todomvc) {
      this.todomvc = this.args.todomvc;
    } else {
      this.todomvc = Store(microstate, next => {
        debugger;
        this.todomvc = next;
      });
    }
  }
}
// END-SNIPPET
