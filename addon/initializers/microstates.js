import BooleanState from '../helpers/boolean';
import ChoiceState from '../helpers/choice';
import ListState from '../helpers/list';
import NumberState from '../helpers/number';
import StringState from '../helpers/string';
import ObjectState from '../helpers/object';

export function initialize(application) {
  application.register('helper:Boolean', BooleanState);
  application.register('helper:Choice', ChoiceState);
  application.register('helper:List', ListState);
  application.register('helper:Number', NumberState);
  application.register('helper:String', StringState);   
  application.register('helper:Object', ObjectState);
}

export default {
  name: 'microstates',
  initialize
};
