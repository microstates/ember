import { MultipleChoice, SingleChoice } from '../models/choice';
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  actions: {
    recompute(previous, [values = []], options) {
      let Type = !!options.multiple ? MultipleChoice : SingleChoice;
      return Type.create(values, options);
    },

    options: {
      toggle(choice, option) {
        return choice.toggle(option);
      },
      select(choice, option) {
        return choice.toggle(option, true);
      },
      deselect(choice, option) {
        return choice.toggle(option, false);
      }
    }
  }
});
