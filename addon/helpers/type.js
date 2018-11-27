import Helper from '@ember/component/helper';
import {getOwner} from '@ember/application';
import { assert } from '@ember/debug';

export default Helper.extend({
  compute([name]) {
    let factory = getOwner(this).factoryFor(`type:${name}`);

    assert(`(type "${name}") could not be looked up`, factory && factory.class);

    return factory.class;
  }
});