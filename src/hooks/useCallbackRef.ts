import * as React from 'react';

import type { AnyFunc } from '@/types/common';
import { useMemoRef } from './useMemoRef';

import type { SetReturnType } from 'type-fest';

export function useCallbackRef<C extends AnyFunc>(callback: C): C;

export function useCallbackRef<C extends AnyFunc>(
  callback: C | undefined,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): void extends ReturnType<C> ? C : SetReturnType<C, ReturnType<C> | undefined>;

export function useCallbackRef<A extends unknown[], R>(
  callback: (...args: A) => R,
): (...args: A) => R;

export function useCallbackRef<A extends unknown[], R>(
  callback: ((...args: A) => R) | undefined,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): (...args: A) => void extends R ? R : R | undefined;

export function useCallbackRef<A extends unknown[], R>(
  callback: ((...args: A) => R) | undefined,
) {
  const callbackRef = useMemoRef(callback);
  return React.useRef((...args: A) => callbackRef.current?.(...args)).current;
}
