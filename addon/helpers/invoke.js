import { helper } from '@ember/component/helper';

export function invoke([context, name, ...args]) {
  let fn = context[name];

  return () => fn.apply(context, args);
}

export default helper(invoke);
