import { Service } from 'ember-microstates';

class User {
  name = String;
  email = String;
  superuser = Boolean;
}

export default Service.extend({
  typeClass: User,

  defaultValue() {
    return {
      superuser: false
    };
  }
});
