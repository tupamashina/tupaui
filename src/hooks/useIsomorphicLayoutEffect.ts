import * as React from 'react';

import { IS_SERVER } from '../const';

export const useIsomorphicLayoutEffect =
  IS_SERVER ? React.useEffect : React.useLayoutEffect;
