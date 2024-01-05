import * as React from 'react';

import type { Writable } from 'type-fest';

function setRefs<T>(refs: React.Ref<T>[], value: T) {
  for (const ref of refs)
    if (typeof ref === 'function') ref(value);
    // eslint-disable-next-line no-param-reassign
    else if (ref) (ref as Writable<typeof ref>).current = value;
}

export function useComposedRefCallback<T>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback((value) => setRefs(refs, value), refs);
}

export function useComposedRefObject<T>(
  ...refs: React.Ref<T>[]
): React.RefObject<T> {
  return React.useMemo(
    () =>
      new Proxy(React.createRef(), {
        set(...args) {
          setRefs(refs, args[2]);
          return Reflect.set(...args);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
