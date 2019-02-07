'use strict';

/*
  We need to dynamically pick which build of microstates to use based on if 
  the consuming app uses non-evergreen browsers or not. This is because 
  native es6 classes and transpiled classes don't work together.
*/
function chooseMicrostatesDistribution(targets) {
  if (targets && targets.browsers && targets.browsers.includes('ie 11')) {
    return 'microstates/dist/microstates.es.js'
  }

  return 'microstates/dist/microstates.umd.js'
}

module.exports = {
  name: require('./package').name,

  options: {
    autoImport: {
      alias: {}
    }
  },

  included() {
    // Dynamically pick which distribution of microstates to use before ember-auto-import does it's magic
    // We need to this here so we can access `this.project`
    this.options.autoImport.alias.microstates = chooseMicrostatesDistribution(this.project.targets);
    this._super.included.apply(this, arguments);
  },
}