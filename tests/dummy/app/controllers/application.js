import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

class MyApp {
  counter = Number;
}

export default Controller.extend({
  currentUserService: service('user'),
  user: alias('currentUserService.microstate'),

  MyApp,
  
  init() {
    this._super(...arguments);
    this.value = {
      counter: 1
    };
    this.value2 = {
      counter: 1
    };
  },

  actions: {
    save() {
      let userMicrostate = this.user;
      let value = userMicrostate.valueOf();

      alert(JSON.stringify(value));
    }
  }
});
