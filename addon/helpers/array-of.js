import Helper from '@ember/component/helper';
import {getOwner} from '@ember/application';
import {assert} from '@ember/debug';
import { ArrayType } from '@microstates/ember';

export default Helper.extend({
  compute([type]) {
    if (typeof type === "string") {
      let factory = getOwner(this).factoryFor(`type:${type}`);
  
      assert(`(array-of "${type}") could not be looked up`, factory && factory.class);

      return ArrayType.of(factory.class);
    } else {
      return ArrayType.of(type);
    }
  }
});