import Ember from 'ember';

export let MicroState = Ember.Helper.extend({
  compute([value = this.default]) {
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

  modelFor(current) {
    let actions = Object.keys(this.actions).reduce((actions, key)=> {
      actions[key] = {
        value: (...args)=> {
          let next = this.actions[key].call(null, current, ...args);
          return this.update(this.modelFor(next));
        }
      };
      return actions;
    }, {});
    if (this.asString) {
      actions.toString = {value: ()=> { return this.asString(current); }};
    }

    return Object.create(this.wrap(current), actions);
  },

  wrap(value) {
    return value;
  }

});
