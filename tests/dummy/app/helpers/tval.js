import { helper } from '@ember/component/helper';

export default helper(([act]) => {
  return (event) => event.target ? act(event.target.value) : act();
});