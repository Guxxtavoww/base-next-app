'use client';

import { useCallback, useState } from 'react';

export function useToggle(initial: boolean) {
  const [toggleState, setToggleState] = useState<boolean>(initial);

  const handleToggle = useCallback(() => {
    setToggleState((prev) => !prev);
  }, [setToggleState]);

  return [toggleState, handleToggle] as const;
}
