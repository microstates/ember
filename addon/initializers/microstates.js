import {
  Any
} from '../index';

export function initialize(application) {
  application.register('type:any', Any);
}

export default {
  initialize
};
