import { useState } from "react"
import { useCount } from "./useCount";

type Options = {
  minStackCount: number,
}

export const useStack = <T,>(initialStack: T[] = [], options: Partial<Options> = {}) => {

  const {
    minStackCount = 0, // by default the stack can have 0 items in it
  } = options

  const [fullStack, setStack] = useState<T[]>(initialStack);
  const [pointer, { increment, decrement }] = useCount(initialStack.length, { min: minStackCount });

  const add = (obj: T) => {
    const newStack = stack.slice(0, pointer)
    setStack([...newStack, obj])
    increment();
  }

  const stack = fullStack.slice(0, pointer)
  const topOfStack = stack[pointer - 1]
  const canMoveBackwards = pointer > minStackCount;
  const canMoveForwards = pointer < fullStack.length

  return {
    stack,
    topOfStack,
    add,
    back: decrement,
    forward: increment,
    canMoveBackwards,
    canMoveForwards
  }
}