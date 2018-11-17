import { NumberType } from 'ember-microstates';

export default class extends NumberType {
  get isValid() {
    return true;
  }
}