"use client";

import { useCallback, useState } from "react";

/**
 * Optional pattern: mark interactive elements with data-cursor-hover
 * and use this to drive visual state. The main cursor also uses
 * [data-cursor-hover] in the document.
 */
export function useCustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const onEnter = useCallback(() => setIsHovering(true), []);
  const onLeave = useCallback(() => setIsHovering(false), []);

  return { isHovering, onEnter, onLeave, setIsHovering };
}
