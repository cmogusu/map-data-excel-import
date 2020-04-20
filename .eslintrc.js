module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      1,
      { singleQuote: true, semi: false, trailingComma: 'all' },
    ],
    'no-console': 1,
    'max-len': 0,
    'comma-dangle': 0,
    'quote-props': 0,
    'arrow-body-style': 0,
    'no-else-return': 0,
    'brace-style': 0,
    'no-underscore-dangle': 0,
    'react/sort-comp': 1,
    'react/jsx-indent': 1,
    'no-shadow': [
      2,
      {
        builtinGlobals: true,
        allow: [
          'location',
          'event',
          'history',
          'find',
          'root',
          'name',
          'close',
          'Map',
          'Text',
          'Request',
          'expect',
        ],
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'react/forbid-prop-types': 1,
    'react/destructuring-assignment': 0,
    'prefer-destructuring': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    }
  },
}