'use strict';

module.exports = {
  name: 'ember-microstates',

  included(app) {
    this._super.included.apply(this, arguments);
  
    app.import('node_modules/microstates/dist/microstates.umd.js', {
      using: [
        { transformation: 'amd', as: 'microstates' }
      ]
    });
  }
};
