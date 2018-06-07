import Controller from '@ember/controller';

class MyApp {
  counter = Number;
}

export default Controller.extend({
  MyApp,
  
  init() {
    this._super(...arguments);
    this.value = {
      counter: 1
    };
  }
});
