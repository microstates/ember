import NumberType from 'ember-microstates/types/number';

export default class extends NumberType {
  get isValid() {
    return true;
  }
}