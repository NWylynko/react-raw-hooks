import { useState } from "react";

export const useArray = <Value,>(initialArray: Array<Value> = []) => {
  const [array, setArray] = useState<Value[]>(Array.from(initialArray));

  const fillArray = (value: Value, start: number | undefined, end: number | undefined) => {
    setArray((currentArray) => {
      return currentArray.fill(value, start, end);
    });
  };

  const popArray = () => {
    setArray((currentArray) => {
      currentArray.pop();
      return currentArray;
    });
  };

  const pushArray = (...items: Value[]) => {
    setArray((currentArray) => {
      currentArray.push(...items);
      return currentArray;
    });
  };

  const reverseArray = () => {
    setArray((currentArray) => {
      return currentArray.reverse();
    });
  };

  const shiftArray = () => {
    setArray((currentArray) => {
      currentArray.shift();
      return currentArray;
    });
  };

  const sortArray = (compareFn?: ((a: Value, b: Value) => number) | undefined) => {
    setArray((currentArray) => {
      return currentArray.sort(compareFn);
    });
  };

  const spliceArray = (start: number, deleteCount: number, ...items: Value[]) => {
    setArray((currentArray) => {
      currentArray.splice(start, deleteCount, ...items);
      return currentArray;
    });
  };

  const unshiftArray = (...items: Value[]) => {
    setArray((currentArray) => {
      currentArray.unshift(...items);
      return currentArray;
    });
  };

  return [
    array,
    {
      fill: fillArray,
      pop: popArray,
      push: pushArray,
      reverse: reverseArray,
      shift: shiftArray,
      sort: sortArray,
      splice: spliceArray,
      unshift: unshiftArray,
    },
  ] as const;
};
