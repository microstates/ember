"use strict";

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  name: require("./package").name,

  options: {
    autoImport: {
      webpack: {
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                keep_classnames: true
              }
            })
          ]
        }
      }
    }
  }
};
