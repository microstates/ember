import { NumberType } from '@microstates/ember';

export default class extends NumberType {
  get isValid() {
    return true;
  }
}