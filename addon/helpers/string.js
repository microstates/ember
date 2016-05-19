/*jshint -W053 */
import Ember from 'ember';

export default Ember.Helper.extend({
  compute([value = ""]) {
    if (!this.current || !this._update) {
      this.current = this.modelFor(value);
    }
    delete this._update;
    return this.current;
  },

  update(model) {
    this._update = true;
    this.current = model;
    this.recompute();
  },

  modelFor(value = "") {
    return Object.create(new String(value), {
      set: {
        value: (value)=> {
          this.update(this.modelFor(value));
        }
      },
      toString: {
        value: ()=> { return value; }
      }
    });
  }
});
