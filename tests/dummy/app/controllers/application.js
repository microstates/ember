import Controller from "@ember/controller";

export default Controller.extend({
  groceries: ["Milk", "Cereal", "Donuts"],
  animals: ["Horse", "Cow", "Lizard"],
  initialCar: { color: "red", model: "Mustang", make: "Ford" },
  additional: { speed: "fast", suspension: "stiff"}
});
