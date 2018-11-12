import UseTypeHelper from '../helpers/use-type';

export default UseTypeHelper.extend({
  compute([value]) {
    this.set('value', value);

    return this.get('state');
  }
})
