import BooleanState from '../helpers/boolean';
import SelectState from '../helpers/select';
import ListState from '../helpers/list';
import NumberState from '../helpers/number';
import StringState from '../helpers/string';
import ObjectState from '../helpers/object';

export function initialize(application) {
  application.register('helper:Boolean', BooleanState);
  application.register('helper:Select', SelectState);
  application.register('helper:List', ListState);
  application.register('helper:Number', NumberState);
  application.register('helper:String', StringState);   
  application.register('helper:Object', ObjectState);
}

export default {
  name: 'microstates',
  initialize
};
