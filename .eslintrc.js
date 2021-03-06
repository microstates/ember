module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['ember', 'prefer-let'],
  extends: ['eslint:recommended', 'plugin:ember/recommended'],
  env: {
    browser: true
  },
  rules: {
    'ember/closure-actions': 'off',
    'ember/avoid-leaking-state-in-ember-objects': 'off',
    'ember/no-side-effects': 'off',
    'prefer-let/prefer-let': 2
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here
        }
      )
    },
    // test files
    {
      files: ['tests/**/*.js'],
      env: {
        embertest: true
      }
    }
  ]
};
