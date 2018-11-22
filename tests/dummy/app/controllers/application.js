import Controller from "@ember/controller";

export default Controller.extend({
  groceries: ["Milk", "Cereal", "Donuts"],
  animals: ["Horse", "Cow", "Lizard"],
  initialCar: { color: "red", model: "Mustang", make: "Ford" },
  additional: { speed: "fast", suspension: "stiff" },
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
