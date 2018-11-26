import Controller from "@ember/controller";

export default Controller.extend({
  todomvcInitial: [
    {
      todos: [
        { id: 0, text: "Go to India", completed: true },
        { id: 1, text: "Go to Space", completed: false },
      ]
    },
    {
      todos: [
        { id: 2, text: "Milk", completed: false },
        { id: 3, text: "Cheese", completed: false },
        { id: 4, text: "Bagels", completed: false }
      ]
    }
  ],
  simpsons: {
    father: {
      name: 'Homer Simpson',
      age: 36
    },
    mother: {
      name: 'Marge Simpson',
      age: 34
    },
    son: {
      name: 'Bart Simpson',
      age: 9
    },
    daughter: {
      name: 'Lisa Simpson',
      age: 7
    }
  }
}); 
