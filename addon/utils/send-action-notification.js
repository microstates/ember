import Ember from 'ember';

export default function sendActionNotification(helper, actionName, state) {
  var actionCallback = helper.options[Ember.String.dasherize(`on-${actionName}`)];
  Ember.sendEvent(helper, actionName, [state]);
  if (actionCallback && actionCallback.call) {
    actionCallback.call(null, state);
  }
}