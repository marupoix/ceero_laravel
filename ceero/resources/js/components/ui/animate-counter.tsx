import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // animation duration in ms
  currency?: boolean; // show peso sign
}

export function AnimatedCounter({ value, duration = 1500, currency = false }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {currency ? `₱${displayValue.toLocaleString()}` : displayValue.toLocaleString()}
    </span>
  );
}
