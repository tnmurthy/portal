import { useState, useEffect, useRef } from 'react';

export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number | null>(null);
  const prev = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    start.current = null;
    const from = prev.current;
    const diff = target - from;

    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + diff * eased);
      setValue(current);
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        prev.current = target;
      }
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}
