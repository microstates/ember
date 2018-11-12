import BooleanState from '../helpers/boolean';
import NumberState from '../helpers/number';
import StringState from '../helpers/string';
import ObjectState from '../helpers/object';

export function initialize(application) {
  application.register('helper:Boolean', BooleanState);
  application.register('helper:Number', NumberState);
  application.register('helper:String', StringState);   
  application.register('helper:Object', ObjectState);
}

export default {
  name: 'microstates',
  initialize
};
