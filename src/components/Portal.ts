import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useIsomorphicLayoutEffect } from '@/hooks';

type PortalContainer = Parameters<typeof ReactDOM.createPortal>[1];

export interface PortalProps {
  isOpen: boolean;
  children: React.ReactNode;
  container?: PortalContainer | null | undefined;
}

export const Portal: React.FC<PortalProps> = ({
  isOpen,
  children,
  container: containerProp,
}) => {
  const [container, setContainer] = React.useState<PortalContainer>();

  useIsomorphicLayoutEffect(
    () => setContainer(containerProp || document.body),
    [containerProp],
  );

  if (!isOpen || !container) return null;
  return ReactDOM.createPortal(children, container);
};
