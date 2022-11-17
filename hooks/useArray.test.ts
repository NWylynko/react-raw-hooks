import { expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useArray } from './useArray';

const groceries = ["potato's", "beans", "ice-cream"]

it('should accept an initial array', () => {
  const { result } = renderHook(() => useArray(groceries));

  expect(result.current[0].length).toBe(groceries.length)
})

it('should "fill" values in to the array', () => {
  const { result } = renderHook(() => useArray(groceries));

  act(() => {
    result.current[1].fill("cake", 0, 3)
  })

  expect(result.current[0]).toStrictEqual(["cake", "cake", "cake"])
})

it('should "pop" and item off the back of the array', () => {
  const { result } = renderHook(() => useArray(groceries));

  expect(result.current[1].pop()).toBe("ice-cream")
  expect(result.current[0].length).toBe(groceries.length - 1)
})

it('should "push" an item on the back of the array', () => {
  const { result } = renderHook(() => useArray(groceries));

  act(() => {
    result.current[1].push("cake")
  })

  expect(result.current[0].length).toBe(groceries.length + 1);
  expect(result.current[0].includes("cake")).toBe(true)
  expect(result.current[0][groceries.length]).toBe("cake")
})

it('should "reverse" the array', () => {
  const { result } = renderHook(() => useArray(groceries));

  act(() => {
    result.current[1].reverse()
  })

  expect(result.current[0]).toStrictEqual(["ice-cream", "beans", "potato's"])
})

it('should "shift" the first element out of the array', () => {
  const { result } = renderHook(() => useArray(groceries));

  expect(result.current[1].shift()).toBe("potato's");
  expect(result.current[0].length).toBe(2)
  expect(result.current[0].includes("potato's")).toBe(false)
})

it('should "sort" the array by the compare function', () => {
  const { result } = renderHook(() => useArray(groceries));

  expect(result.current[1].sort()).toStrictEqual(["beans", "ice-cream", "potato's"])
  expect(result.current[0]).toStrictEqual(["beans", "ice-cream", "potato's"])
})

it('should "splice" the array to get a subset', () => {
  const { result } = renderHook(() => useArray(['Jan', 'March', 'April', 'June']));

  act(() => {
    result.current[1].splice(1, 0, 'Feb')
  })

  expect(result.current[0]).toStrictEqual(["Jan", "Feb", "March", "April", "June"])
})

it('should "unshift" an item to the start of the array', () => {
  const { result } = renderHook(() => useArray(groceries));

  act(() => {
    result.current[1].unshift("cake")
  })

  expect(result.current[0].length).toBe(groceries.length + 1);
  expect(result.current[0].includes("cake")).toBe(true)
  expect(result.current[0][0]).toBe("cake")
})