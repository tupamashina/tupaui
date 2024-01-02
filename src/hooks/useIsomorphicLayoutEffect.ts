import { useEffect, useLayoutEffect } from 'react';
import { IS_SERVER } from '../const';

export const useIsomorphicLayoutEffect =
  IS_SERVER ? useEffect : useLayoutEffect;
