import * as React from 'react';

import { IS_PROD } from '@/const';
import { useCallbackRef } from './useCallbackRef';
import { useMemoRef } from './useMemoRef';

//* =============================== Debugging hook ===============================

interface DebuggingParams {
  isControlled: boolean;
  controlledValue: unknown;
  stateName: string | undefined;
  componentName: string | undefined;
}

function useControllableStateDebugging({
  isControlled,
  controlledValue,
  stateName = 'unknown',
  componentName = 'Unknown',
}: DebuggingParams) {
  const didWarnAboutChangingNatureOfState = React.useRef(false);

  React.useEffect(() => {
    if (
      !didWarnAboutChangingNatureOfState.current &&
      isControlled !== (controlledValue !== undefined)
    ) {
      didWarnAboutChangingNatureOfState.current = true;

      // eslint-disable-next-line no-console
      console.error(
        [
          `TupaUI warning: \`${componentName}\` component is changing`,
          `${isControlled ? 'a controlled' : 'an uncontrolled'} \`${stateName}\``,
          `state to be ${isControlled ? 'uncontrolled' : 'controlled'}.`,
          'This is likely caused by the value changing from',
          `${isControlled ? 'a defined to undefined' : 'undefined to a defined value'},`,
          'which should not happen. Decide between using a controlled or uncontrolled',
          `\`${componentName}\` component for it’s lifetime. The nature of`,
          'the state is determined during the first render and is considered',
          'controlled if the value is not `undefined`. More info:',
          'https://reactjs.org/link/controlled-components',
        ].join(' '),
      );
    }
  }, [componentName, controlledValue, isControlled, stateName]);
}

//* =========================== Types and overloads ============================

type ControllableStateUpdater<T> = (prevState: T | undefined) => T;
type SetControllableStateAction<T> = T | ControllableStateUpdater<T>;

type UseControllableStateDebuggingOptions = Pick<
  { [K in keyof DebuggingParams]?: Exclude<DebuggingParams[K], undefined> },
  'componentName' | 'stateName'
>;

export function useControllableState<
  T,
  E extends Event | React.SyntheticEvent = Event | React.SyntheticEvent,
>(
  controlledValue: T | undefined,
  uncontrolledDefaultValue: T | (() => T | undefined) | undefined,
  onChange: ((value: T, event?: E) => void) | undefined,
  debuggingOptions?: UseControllableStateDebuggingOptions,
): [T | undefined, (action: SetControllableStateAction<T>, event?: E) => void];

export function useControllableState<T, E extends Event | React.SyntheticEvent>(
  controlledValue: T | undefined,
  uncontrolledDefaultValue: T | (() => T | undefined) | undefined,
  onChange: ((value: T, event: E) => void) | undefined,
  debuggingOptions?: UseControllableStateDebuggingOptions,
): [T | undefined, (action: SetControllableStateAction<T>, event: E) => void];

//* =========================== Hook implementation ============================

export function useControllableState<
  T,
  E extends Event | React.SyntheticEvent = Event | React.SyntheticEvent,
>(
  controlledValue: T | undefined,
  uncontrolledDefaultValue: T | (() => T | undefined) | undefined,
  onChange: ((value: T, event?: E) => void) | undefined,
  { stateName, componentName }: UseControllableStateDebuggingOptions = {},
) {
  const [uncontrolledValueState, setUncontrolledValueState] = React.useState(
    uncontrolledDefaultValue,
  );

  const isControlled = React.useRef(controlledValue !== undefined).current;
  const currentValue = isControlled ? controlledValue : uncontrolledValueState;

  const currentValueRef = useMemoRef(currentValue);
  const onChangeCallback = useCallbackRef(onChange);

  const setCurrentValue = React.useRef(
    (action: SetControllableStateAction<T>, event?: E) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const currentValue = currentValueRef.current;

      const newValue =
        typeof action === 'function' ?
          (action as ControllableStateUpdater<T>)(currentValue)
        : action;

      if (!Object.is(currentValue, newValue)) {
        onChangeCallback(newValue, event);
        if (!isControlled) setUncontrolledValueState(newValue);
      }
    },
  ).current;

  if (!IS_PROD) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(
      stateName ? { [stateName]: currentValue } : currentValue,
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControllableStateDebugging({
      stateName,
      isControlled,
      componentName,
      controlledValue,
    });
  }

  return [currentValue, setCurrentValue];
}
