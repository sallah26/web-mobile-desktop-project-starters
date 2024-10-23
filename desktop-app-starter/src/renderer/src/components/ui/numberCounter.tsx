'use client';

import { useEffect, useState } from 'react';

type CountUpAnimationProps = {
  initialValue: number;
  targetValue: number;
  duration: number; // New prop: duration in milliseconds
};

export const CountUpAnimation = ({
  initialValue,
  targetValue,
  duration,
}: CountUpAnimationProps) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    let startValue = initialValue;
    const interval = Math.floor(duration / (targetValue - initialValue));

    const counter = setInterval(() => {
      startValue += 1;
      setCount(startValue);
      if (startValue >= targetValue) {
        clearInterval(counter);
      }
    }, interval);

    return () => {
      clearInterval(counter);
    };
  }, [targetValue, initialValue, duration]);

  return <div>{count.toFixed(0)}</div>;
};
