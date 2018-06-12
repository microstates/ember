import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function invoke([context, name, ...args], { value: valuePath }) {
  let fn = context[name];

  return (res) => {
    let value = valuePath ? get(res, valuePath) : (valuePath === false ? undefined : res);
    return fn.apply(context, args.concat(value));
  };
}

export default helper(invoke);
