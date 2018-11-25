// BEGIN-SNIPPET many-todomvc-type
import { reduce } from "@microstates/ember";
import TodoMVC from "./todomvc";

export default class ManyTodoMVCs {
  lists = [TodoMVC];
  newListTitle = String;

  addList() {
    return this.lists
      .push({ title: this.newListTitle.state, todos: [] })
      .newListTitle.set("");
  }

  get isListTitleUnique() {
    return reduce(
      this.lists,
      (isUnique, list) =>
        isUnique && list.title.state !== this.newListTitle.state,
      true
    );
  }

  get isValid() {
    return this.newListTitle.state !== "" && this.isListTitleUnique;
  }
}
// END-SNIPPET