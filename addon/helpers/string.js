/*jshint -W053 */
import MicroStateHelper  from 'ember-microstates/-microstate-helper';

export default MicroStateHelper.extend({

  construct([string = '']) {
    return String(string);
  },

  wrap(value) {
    return new String(value);
  }
});
