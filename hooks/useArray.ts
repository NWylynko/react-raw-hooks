import { useState } from 'react';



export const useArray = <Value,> (initialArray: Array<Value> = []) => {

  const [array, setArray] = useState<Value[]>(Array.from(initialArray))

  const fillArray: Array<Value>["fill"] = (value, start, end) => {
    let newArray: Value[]
    setArray(currentArray => {
      newArray = currentArray.fill(value, start, end)
      return newArray
    })
    return newArray
  }

  const popArray: Array<Value>["pop"] = () => {
    let lastValue: Value;
    setArray(currentArray => {
      lastValue = currentArray.pop()
      return currentArray
    })
    return lastValue
  }

  const pushArray: Array<Value>["push"] = (value) => {
    let length: number;
    setArray(currentArray => {
      length = currentArray.push(value);
      return currentArray
    })
    return length
  }

  const reverseArray: Array<Value>["reverse"] = () => {
    let newArray: Value[]
    setArray(currentArray => {
      newArray = currentArray.reverse()
      return newArray
    })
    return newArray
  }

  const shiftArray: Array<Value>["shift"] = () => {
    let firstValue: Value;
    setArray(currentArray => {
      firstValue = currentArray.shift()
      return currentArray
    })
    return firstValue
  }

  const sortArray: Array<Value>["sort"] = (compareFn) => {
    let newArray: Value[]
    setArray(currentArray => {
      newArray = currentArray.sort(compareFn)
      return newArray
    })
    return newArray
  }

  const spliceArray = (start: number, deleteCount: number, ...items: Value[]) => {
    let newArray: Value[]
    setArray(currentArray => {
      newArray = currentArray.splice(start, deleteCount, ...items)
      return currentArray
    })
    return newArray
  }

  const unshiftArray: Array<Value>["unshift"] = (value) => {
    let newArray: Value[]
    setArray(currentArray => {
      length = currentArray.unshift(value);
      return currentArray
    })
    return length
  }

  return [
    array, {
      fill: fillArray,
      pop: popArray,
      push: pushArray,
      reverse: reverseArray,
      shift: shiftArray,
      sort: sortArray,
      splice: spliceArray as Array<Value>["splice"],
      unshift: unshiftArray
    }
  ] as const
}