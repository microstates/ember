import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('api');
  this.route('primitive-types');
  this.route('composed-types');
  this.route('parameterized-types');
  this.route('higher-order-types');
});

export default Router;
