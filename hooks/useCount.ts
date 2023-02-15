import { useState } from "react";

type Options = {
  min: number;
  max: number;
  step: number;
};

export const useCount = (initialCount: number = 0, options: Partial<Options> = {}) => {
  const { min = undefined, max = undefined, step = 1 } = options;

  if (min !== undefined) {
    if (initialCount < min) {
      throw new Error("Initial Count is less then minimum allowed count");
    }
  }

  if (max !== undefined) {
    if (initialCount > max) {
      throw new Error("Initial Count is more than the maximum allowed count");
    }
  }

  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((n) => findMaxAllowedNumber(n + step, max));
  const decrement = () => setCount((n) => findMinAllowedNumber(n - step, min));
  const add = (amount: number) => setCount((n) => findMaxAllowedNumber(n + amount, max));
  const subtract = (amount: number) => setCount((n) => findMinAllowedNumber(n - amount, min));
  const reset = () => setCount(initialCount);

  return [
    count,
    {
      increment,
      decrement,
      add,
      subtract,
      reset,
      setCount,
    },
  ] as const;
};

const findMaxAllowedNumber = (n: number, max: number | undefined) => {
  if (max === undefined) {
    return n;
  } else {
    return Math.min(n, max);
  }
};

const findMinAllowedNumber = (n: number, min: number | undefined) => {
  if (min === undefined) {
    return n;
  } else {
    return Math.max(n, min);
  }
};
