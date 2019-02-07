'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    autoImport: {
      alias: {
        // Need to specify this instead of UMD or CJS version to support ie11
        'microstates': 'microstates/dist/microstates.es.js'
      }
    }
  }
};
