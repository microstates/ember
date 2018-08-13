import Service from '@ember/service';
import { Store, create } from 'microstates';

class User {
  name = String;
  email = String;
  superuser = Boolean;

  get isFilled() {
    return this.name && this.email;
  }

  get notFilled() {
    return !this.isFilled;
  }
}

const value = {
  superuser: false
};

export default Service.extend({
  init() {
    this._super(...arguments);

    const initial = create(User, value);

    this.set('microstate', Store(initial, (next) => {
      // set the internal state of the component to the next state
      this.set('microstate', next);
    }));
  }
});
