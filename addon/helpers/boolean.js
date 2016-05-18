import Ember from 'ember';

const True = [true];
const False = [];

export default Ember.Helper.extend({
  compute([value]) {
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

  modelFor(value) {
    let representation = !!value ? True : False;
    return Object.create(representation, {
      toggle: {
        value: ()=> {
          this.update(this.modelFor(!value));
        }
      },
      set: {
        value: (value)=> {
          this.update(this.modelFor(value));
        }
      }
    });
  }
});
