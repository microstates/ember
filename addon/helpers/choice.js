import { MultipleChoice, SingleChoice } from '../models/choice';
import { MicroStateHelper } from 'ember-microstates';

export default MicroStateHelper.extend({
  construct([list = []], options) {
    let Type = !!options.multiple ? MultipleChoice : SingleChoice;
    return Type.create(list, options);
  },

  actions: {
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
