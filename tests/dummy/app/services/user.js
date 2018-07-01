import { createService } from 'ember-microstates';
import { create } from 'microstates';

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
const microstate = create(User, value);

export default createService(microstate);
