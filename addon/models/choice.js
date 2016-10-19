import { find, includes } from '../utils/array-polyfill';

class Choice {
  constructor(options) {
    this.options = options;
  }

  valueOf() {
    return this;
  }
}

export class SingleChoice extends Choice {

  static create(values, options) {
    return new this(values.map(v => new Option(v, v === options.selection)));
  }

  get selection() {
    let selectedOption = find(this.options, o => o.isSelected);

    return selectedOption ? selectedOption.value : null;
  }

  toggle(option, isSelected = !option.isSelected) {
    return new SingleChoice(this.options.map(o => o.toggle(o === option && isSelected)));
  }
}

export class MultipleChoice extends Choice {

  static create(values, options) {
    let selection = [];
    if (options.selection) {
      selection = options.selection.forEach ? options.selection : [options.selection];
    }
    return new MultipleChoice(values.map(v => new Option(v, includes(selection, v))));
  }

  get selection() {
    return this.options.filter(o => o.isSelected).map(o => o.value);
  }

  toggle(option, isSelected = !option.isSelected) {
    return new MultipleChoice(this.options.map(o => option === o ? o.toggle(isSelected) : o));
  }
}

export class Option {
  constructor(value, isSelected = false) {
    this.value = value;
    this.isSelected = isSelected;
  }

  toggle(isSelected = !this.isSelected) {
    return new Option(this.value, isSelected);
  }
}
