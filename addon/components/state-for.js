import Component from '@ember/component';
import layout from '../templates/components/state-for';
import { Store, create } from 'microstates';

const StateFor = Component.extend({
  tagName: '',
  layout,

  init() {
    this._super(...arguments);

    let onchange = this.get('onchange');
    let type = this.get('type');
    let value = this.get('value');

    // create initial microstate from type and value
    let initial = create(type, value);
    let callback = (next) => {
      // If onchange action is defined call it with the new state
      if (typeof onchange === 'function') {
        onchange(next.state);
      }

      // set the internal state of the component to the next state
      this.set('microstate', next);
    };

    // set the components state to microstate with middleware in it
    this.set('microstate', Store(initial, callback));
  }
});

StateFor.reopenClass({
  positionalParams: ['type']
});

export default StateFor;
