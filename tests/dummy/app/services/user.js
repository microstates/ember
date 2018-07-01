import { Service } from 'ember-microstates';

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

export default Service.extend({
  typeClass: User,

  defaultValue() {
    return {
      superuser: false
    };
  }
});
