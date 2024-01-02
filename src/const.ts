export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

export const IS_SERVER = typeof window === 'undefined';
export const IS_BROWSER = !IS_SERVER;