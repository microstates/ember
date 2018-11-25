import Controller from "@ember/controller";

export default Controller.extend({
  initial: {
    lists: [
      {
        title: "bucket",
        todos: [
          { id: 0, text: "Go to India", completed: true },
          { id: 1, text: "Go to Space", completed: false },
        ]
      },
      {
        title: "shopping",
        todos: [
          { id: 2, text: "Milk", completed: false },
          { id: 3, text: "Cheese", completed: false },
          { id: 4, text: "Bagels", completed: false }
        ]
      }
    ]
  }
}); 
