import { useState } from "react"
import { useCount } from "./useCount";

export const useStack = <T,>(initialStack: T[] = []) => {
  const [fullStack, setStack] = useState<T[]>(initialStack);
  const [pointer, { increment, decrement }] = useCount(fullStack.length);

  const add = (obj: T) => {
    const newStack = stack.slice(0, pointer)
    setStack([...newStack, obj])
    increment();
  }

  const stack = fullStack.slice(0, pointer)
  const canMoveBackwards = pointer > 0;
  const canMoveForwards = pointer < fullStack.length

  return {
    stack,
    add,
    back: decrement,
    forward: increment,
    canMoveBackwards,
    canMoveForwards
  }
}