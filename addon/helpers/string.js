/*jshint -W053 */
import Ember from 'ember';
import { MicroState } from 'ember-microstates';

export default MicroState.extend({
  default: "",

  wrap(value) {
    return Ember.assign(new String(value), {
      toString() { return value; }
    });
  },

  actions: {
    set(string, value) {
      return String(value);
    }
  }
});
