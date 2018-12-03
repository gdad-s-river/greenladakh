import { useEffect, useRef } from 'react';

/**
 * for explanation see —
 * https://usehooks.com/#usePrevious
 */

export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}