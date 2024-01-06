/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: { project: true, tsconfigRootDir: __dirname },
  ignorePatterns: ['.eslintrc.cjs', 'rollup.config.js', '/dist'],

  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],

  settings: { 'import/resolver': { typescript: true } },

  rules: {
    // ESLint
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },

      {
        message:
          "Do not import default or named exports from React. Use a namespace import (import * as React from 'react';) instead.",
        selector:
          'ImportDeclaration[source.value="react"] ImportDefaultSpecifier, ImportDeclaration[source.value="react"] ImportSpecifier',
      },
      {
        message:
          "Do not import default or named exports from ReactDOM. Use a namespace import (import * as ReactDOM from 'react-dom';) instead.",
        selector:
          'ImportDeclaration[source.value="react-dom"] ImportDefaultSpecifier, ImportDeclaration[source.value="react-dom"] ImportSpecifier',
      },
      {
        message:
          "Do not import default or named exports from ReactDOM. Use a namespace import (import * as ReactDOM from 'react-dom/client';) instead.",
        selector:
          'ImportDeclaration[source.value="react-dom/client"] ImportDefaultSpecifier, ImportDeclaration[source.value="react-dom/client"] ImportSpecifier',
      },
      {
        message:
          "Do not import default or named exports from ReactDOMServer. Use a namespace import (import * as ReactDOM from 'react-dom/server';) instead.",
        selector:
          'ImportDeclaration[source.value="react-dom/server"] ImportDefaultSpecifier, ImportDeclaration[source.value="react-dom/server"] ImportSpecifier',
      },
    ],

    // TypeScript plugin
    '@typescript-eslint/no-unused-vars': 'warn',

    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],

    // React
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: '(useIsomorphicLayoutEffect)' },
    ],

    // Import plugin
    'import/prefer-default-export': 'off',

    'import/order': [
      'warn',
      {
        distinctGroup: false,
        'newlines-between': 'always',
        alphabetize: { order: 'asc', orderImportKind: 'asc' },

        groups: [
          ['builtin', 'external', 'internal'],
          ['index', 'sibling', 'parent'],
          ['type', 'unknown'],
        ],

        pathGroups: [
          { pattern: '@/**', group: 'parent', position: 'before' },
          { pattern: '../**', group: 'parent', position: 'before' },
          { pattern: './**', group: 'sibling', position: 'after' },
        ],
      },
    ],

    // Unicorn plugin
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',

    'unicorn/filename-case': [
      'error',
      { cases: { camelCase: true, pascalCase: true } },
    ],
  },
};
