/* eslint-disable unicorn/no-typeof-undefined */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

// https://github.com/facebook/react/blob/main/packages/shared/ExecutionEnvironment.js#L10
export const IS_SERVER =
  typeof window === 'undefined' ||
  typeof window.document === 'undefined' ||
  typeof window.document.createElement === 'undefined';

export const IS_BROWSER = !IS_SERVER;
