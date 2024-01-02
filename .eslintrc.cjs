/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  env: { es6: false, es2020: true, es2024: false, browser: true },
  parserOptions: { project: true, ecmaVersion: 11, tsconfigRootDir: __dirname },

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
};
