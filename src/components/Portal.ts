import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useIsomorphicLayoutEffect } from '@/hooks';
import { useForceUpdate } from '@/hooks/useForceUpdate';

type PortalContainer = Parameters<typeof ReactDOM.createPortal>[1];

export interface PortalProps {
  children: React.ReactNode;
  container?: PortalContainer | null;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  container: containerProp,
}) => {
  const bodyRef = React.useRef<HTMLElement | null>(null);
  const forceUpdate = useForceUpdate();

  useIsomorphicLayoutEffect(() => {
    if (!bodyRef.current) {
      bodyRef.current = document.body;
      if (!containerProp) forceUpdate();
    }
  }, [containerProp, forceUpdate]);

  const container = containerProp || bodyRef.current;
  return container && ReactDOM.createPortal(children, container);
};
