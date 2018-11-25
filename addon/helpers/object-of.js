import Helper from '@ember/component/helper';
import {getOwner} from '@ember/application';
import {assert} from '@ember/debug';
import { ObjectType } from '@microstates/ember';

export default Helper.extend({
  compute([type]) {
    if (typeof type === "string") {
      let factory = getOwner(this).factoryFor(`type:${type}`);
  
      assert(`(object-of "${type}") could not be looked up`, factory && factory.class);

      return ObjectType.of(factory.class);
    } else {
      return ObjectType.of(type);
    }
  }
});