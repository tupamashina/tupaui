import * as React from 'react';

import { IS_PROD } from '@/const';
import { tuple } from '@/utils/tuple';
import { useCallbackRef } from './useCallbackRef';
import { useMemoRef } from './useMemoRef';

import type { Simplify } from 'type-fest';

interface UseControllableStateWarningsParams {
  isControlled: boolean;
  controlledValue: unknown;
  stateName?: string;
  componentName?: string;
}

function useControllableStateWarnings({
  isControlled,
  controlledValue,
  stateName = 'unknown',
  componentName = 'Unknown',
}: UseControllableStateWarningsParams) {
  const didWarnAboutChangingNatureOfStateRef = React.useRef(false);

  React.useEffect(() => {
    if (
      !didWarnAboutChangingNatureOfStateRef.current &&
      isControlled !== (controlledValue !== undefined)
    ) {
      didWarnAboutChangingNatureOfStateRef.current = true;

      // eslint-disable-next-line no-console
      console.error(
        [
          `TupaUI warning: \`${componentName}\` component is changing`,
          `${isControlled ? 'a controlled' : 'an uncontrolled'} \`${stateName}\``,
          `state to be ${isControlled ? 'uncontrolled' : 'controlled'}. This`,
          'is likely caused by the value changing from',
          `${isControlled ? 'a defined to undefined' : 'undefined to a defined value'},`,
          'which should not happen. Decide between using a controlled or uncontrolled',
          `\`${componentName}\` component for it’s lifetime. The nature of`,
          'the state is determined during the first render and is considered',
          'controlled if the value is not `undefined`. More info:',
          'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable',
        ].join(' '),
      );
    }
  }, [componentName, controlledValue, isControlled, stateName]);
}

type ControllableStateUpdater<T> = (prevState: T | undefined) => T;
type SetControllableStateAction<T> = T | ControllableStateUpdater<T>;

export function useControllableState<T>(
  controlledValue: T | undefined,
  uncontrolledDefaultValue: T | (() => T | undefined) | undefined,
  onChange: ((value: T) => void) | undefined,

  debugParams?: Simplify<
    Pick<UseControllableStateWarningsParams, 'componentName' | 'stateName'>
  >,
) {
  const [uncontrolledValueState, setUncontrolledValueState] = React.useState(
    uncontrolledDefaultValue,
  );

  const isControlled = React.useRef(controlledValue !== undefined).current;
  const currentValue = isControlled ? controlledValue : uncontrolledValueState;

  const currentValueRef = useMemoRef(currentValue);
  const onChangeCallback = useCallbackRef(onChange);

  const setCurrentValue = React.useRef<
    React.Dispatch<SetControllableStateAction<T>>
  >((action) => {
    const newValue =
      typeof action === 'function' ?
        (action as ControllableStateUpdater<T>)(currentValueRef.current)
      : action;

    if (!Object.is(newValue, currentValueRef.current)) {
      onChangeCallback(newValue);
      if (!isControlled) setUncontrolledValueState(newValue);
    }
  }).current;

  if (!IS_PROD)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControllableStateWarnings({
      isControlled,
      controlledValue,
      ...debugParams,
    });

  return tuple(currentValue, setCurrentValue);
}
