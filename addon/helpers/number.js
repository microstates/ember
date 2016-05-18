import Ember from 'ember';

export default Ember.Helper.extend({
  compute([value = 0]) {
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

  modelFor(value = 0) {
    return Object.create(new Number(value), {
      add: {
        value: (amount = 1)=> {
          this.update(this.modelFor(value + amount));
        }
      },
      subtract: {
        value: (amount)=> {
          this.update(this.modelFor(value - amount));
        }
      },
      toString: {
        value: ()=> { return new String(value); }
      }
    });
  }
});
