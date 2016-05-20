import Ember from 'ember';

export let MicroState = Ember.Helper.extend({
  compute([value = this.default]) {
    if (!this.value || !this._update) {
      this.value = value;
    }
    let current = this.value;
    let actions = Object.keys(this.actions).reduce((actions, key)=> {
      actions[key] = {
        value: (...args)=> {
          let action = this.actions[key];
          return this.setState((curr) => action.call(null, curr, ...args));
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
  },

  setState(updateFn = (current)=> current) {
    this._update = true;
    this.value = updateFn.call(this, this.value);
    this.recompute();
    return this.value;
  }
});
