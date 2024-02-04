import * as React from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

function useReactId(idOverride?: string) {
  const reactId = React.useId();
  return idOverride || reactId;
}

let globalIdCounter = -1;

function useClientSideGlobalId(idOverride?: string) {
  const idRef = React.useRef<string>();
  const [, forceUpdate] = React.useReducer((n: number) => n + 1, 0);

  useIsomorphicLayoutEffect(() => {
    if (!idRef.current) {
      idRef.current = `tupaui-${(globalIdCounter += 1)}`;
      if (!idOverride) forceUpdate();
    }
  }, [idOverride]);

  return idOverride || idRef.current;
}

export const useId = 'useId' in React ? useReactId : useClientSideGlobalId;
