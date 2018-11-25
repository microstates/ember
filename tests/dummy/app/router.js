import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tree');
  this.route('todomvc');
  this.route('todomvc-manager');
});

export default Router;
