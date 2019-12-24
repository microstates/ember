// BEGIN-SNIPPET todomvc-component-javascript
import Component from "@glimmer/component";
import { state } from "@microstates/ember";
import TodoMVC from "../types/todomvc";

const initial = {
  title: "todos",
  todos: [
    { id: 0, text: "Checkout Microstates demo", completed: true },
    { id: 1, text: "Try Microstates in a side project", completed: false },
    { id: 2, text: "Use Microstates in a real app", completed: false }
  ]
};

export default class TodoMvc extends Component {
  // this property is overwritten when context controls the state
  @state(TodoMVC, initial)
  todomvc;
}
// END-SNIPPET
