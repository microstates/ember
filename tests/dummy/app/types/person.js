// BEGIN-SNIPPET person-type
// file in app/types/person.js
export default class Person {
  name = String;
  age = Number;

  get summary() {
    return `${this.name.state} is ${this.age.state}`;
  }
}
// END-SNIPPET