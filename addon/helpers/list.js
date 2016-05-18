import Ember from 'ember';

export default Ember.Helper.extend({
  compute([members = []]) {
    if (!this.current || !this._update) {
      this.current = this.modelFor(members);
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
    return Object.create(value, {
      add: {
        value: (item)=> {
          this.update(this.modelFor(value.concat(item)));
        }
      },
      remove: {
        value: (item)=> {
          this.update(this.modelFor(value.filter(i => i !== item)));
        }
      },
      push: {
        value: (item)=> {
          this.update(this.modelFor(value.concat(item)));
        }
      },
      pop: {
        value: ()=> {
          this.update(this.modelFor(value.slice(0, value.length - 1)));
        }
      },
      shift: {
        value: ()=> {
          this.update(this.modelFor(value.slice(1)));
        }
      },
      unshift: {
        value: (item)=> {
          this.update(this.modelFor([item].concat(value)));
        }
      }
    });
  }
});
