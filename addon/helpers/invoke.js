import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function invoke([context, name, ...args], { value: eventValue }) {
  let fn = context[name];

  return (e) => {
    debugger;
    let value = get(e, eventValue);
    return fn.apply(context, args.concat(value));
  };
}

export default helper(invoke);
