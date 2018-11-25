import Controller from "@ember/controller";

export default Controller.extend({
  initialTodoMVC: {
    todos: [
      { id: 0, text: 'Checkout Microstates demo', completed: true },
      { id: 1, text: 'Try Microstates in a side project', completed: false },
      { id: 2, text: 'Use Microstates in a real app', completed: false }
    ]
  },
  treeInitial: {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          { children: [{}], isOpen: true, counter: 3 }
                        ],
                        isOpen: true
                      }
                    ],
                    isOpen: true,
                    counter: 1
                  }
                ],
                isOpen: true,
                counter: 1
              }
            ],
            isOpen: true,
            counter: 1
          }
        ],
        isOpen: true,
        counter: 1
      }
    ],
    isOpen: true
  }
});
