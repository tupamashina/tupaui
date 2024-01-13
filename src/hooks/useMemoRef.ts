import * as React from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useMemoRef<T>(value: T) {
  const valueRef = React.useRef(value);

  useIsomorphicLayoutEffect(() => {
    valueRef.current = value;
  });

  return valueRef as Readonly<typeof valueRef>;
}
