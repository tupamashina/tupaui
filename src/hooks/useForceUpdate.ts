import * as React from 'react';

export function useForceUpdate() {
  return React.useReducer((n: number) => n + 1, 0)[1];
}
