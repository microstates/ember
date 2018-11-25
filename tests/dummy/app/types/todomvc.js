// BEGIN-SNIPPET todomvc-type
import { reduce, filter } from "@microstates/ember";

export const SHOW_ALL = "";
export const SHOW_COMPLETED = "show_completed";
export const SHOW_ACTIVE = "show_active";

export class Todo {
  id = Number
  text = String
  completed = Boolean
}

export class EditableTodo extends Todo {
  editing = Boolean

  edit() {
    return this.editing.set(true);
  }

  save() {
    return this.editing.set(false);
  }
}

export default class TodoMVC {
  todos   = [EditableTodo]  // Contains array of todo items
  newTodo = String
  filter = String

  get nextId() {
    return reduce(this.todos, (acc, todo) => Math.max(todo.id.state, acc), 0) + 1;
  }

  get completed() {
    return filter(this.todos, todo => todo.completed.state);
  }

  get active() {
    return filter(this.todos, todo => !todo.completed.state);
  }

  get isAllComplete() {
    return this.hasTodos && this.active.length === 0;
  }

  get hasTodos() {
    return this.todos.length > 0;
  }

  get hasCompleted() {
    return this.completed.length > 0;
  }

  get filters() {
    let option = (key, label) => ({
      key,
      label,
      selected: this.filter.state === key,
      select: () => this.filter.set(key)
    });

    return [
      option(SHOW_ALL, 'All'),
      option(SHOW_ACTIVE, 'Active'),
      option(SHOW_COMPLETED, 'Completed')
    ];
  }

  get filtered() {
    switch (this.filter.state) {
      case SHOW_COMPLETED: return this.completed;
      case SHOW_ACTIVE: return this.active;
      case SHOW_ALL:
      default:
        return this.todos;
    }
  }

  insertNewTodo() {
    if (this.newTodo.state === "") {
      return this;
    } else {
      return this.todos
        .push({
          text: this.newTodo.state,
          id: this.nextId,
          completed: false
        })
        .newTodo.set("");
    }
  }

  clearCompleted() {
    return this.todos.filter(({ completed }) => !completed.state);
  }

  toggleAll() {
    return this.todos.map(todo => todo.completed.set(true));
  }
}
// END-SNIPPET