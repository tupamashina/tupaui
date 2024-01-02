module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: { project: true, tsconfigRootDir: __dirname },

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
