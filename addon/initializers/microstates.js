import BooleanHelper from '../helpers/boolean';
import NumberHelper from '../helpers/number';
import StringHelper from '../helpers/string';
import ObjectHelper from '../helpers/object';
import ArrayHelper from '../helpers/array';

export function initialize(application) {
  application.register('helper:Boolean', BooleanHelper);
  application.register('helper:Number', NumberHelper);
  application.register('helper:String', StringHelper);   
  application.register('helper:Object', ObjectHelper);
  application.register('helper:Array', ArrayHelper);
}

export default {
  name: 'microstates',
  initialize
};
