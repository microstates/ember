import { MultipleSelect, SingleSelect } from '../models/select';
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  initialValueFor([values = []], options) {
    let Type = options.multiple ? MultipleSelect : SingleSelect;
    return Type.create(values, options);
  },

  transitions: {
    options: {
      toggle(selection, option) {
        return selection.toggle(option);
      },
      select(selection, option) {
        return selection.toggle(option, true);
      },
      deselect(selection, option) {
        return selection.toggle(option, false);
      }
    }
  }
});
