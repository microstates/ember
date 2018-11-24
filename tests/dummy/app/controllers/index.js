import Controller from "@ember/controller";

export default Controller.extend({
  groceries: ["Milk", "Cereal", "Donuts"],
  animals: ["Horse", "Cow", "Lizard"],
  initialCar: { color: "red", model: "Mustang", make: "Ford" },
  additional: { speed: "fast", suspension: "stiff" },
  initialTodomvc: {
    todos: [
      { id: 0, text: 'Checkout Microstates demo', completed: true },
      { id: 1, text: 'Try Microstates in a side project', completed: false },
      { id: 2, text: 'Use Microstates in a real app', completed: false }
    ]
  },
  tree: {
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
