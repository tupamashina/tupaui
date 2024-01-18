export function tuple<T extends [...(readonly unknown[])]>(...args: T) {
  return args;
}
