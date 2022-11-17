import { expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useSet } from './useSet';

const groceries = new Set(["potatos", "beans", "ice-cream"])

it('should accept an initial set', () => {
  const { result } = renderHook(() => useSet(groceries));

  expect(result.current.size).toBe(groceries.size)
})

it('should add an item to the set', () => {
  const { result } = renderHook(() => useSet(groceries));
  
  act(() => {
    result.current.add("bread")
  })

  expect(result.current.has("bread")).toBe(true)
  expect(result.current.size).toBe(groceries.size + 1)
})

it('should clear the set', () => {
  const { result } = renderHook(() => useSet(groceries));
  
  act(() => {
    result.current.clear()
  })

  expect(result.current.size).toBe(0)
  expect(result.current.keys()).not.toStrictEqual(groceries.keys())
})

it('should remove an item from the set', () => {
  const { result } = renderHook(() => useSet(groceries));
  
  act(() => {
    result.current.delete("beans")
  })

  expect(result.current.has("beans")).toBe(false)
  expect(result.current.size).toBe(groceries.size - 1)
})

it('should iterate over the entries', () => {
  const { result } = renderHook(() => useSet(groceries));

  const originalIterator = groceries.entries()
  const iterator = result.current.entries()

  for (let i = 0; i < groceries.size; i++) {
    expect(originalIterator.next().value)
      .toStrictEqual(iterator.next().value)
  }

})


it('should forEach over the set', () => {
  const { result } = renderHook(() => useSet(groceries));

  const original = []
  const hooked = []

  groceries.forEach((item) => {
    original.push(item)
  })

  result.current.forEach((item) => {
    hooked.push(item)
  })

  expect(original).toStrictEqual(hooked)
})

it('should lookup item from set', () => {
  const { result } = renderHook(() => useSet(groceries));

  expect(result.current.has("beans")).toBe(groceries.has("beans"))
  expect(result.current.has("not-found")).toBe(groceries.has("not-found"))
})

it('should return the keys of the set', () => {
  const { result } = renderHook(() => useSet(groceries));

  expect(result.current.keys()).toStrictEqual(groceries.keys())
})

it('should return the values of the set', () => {
  const { result } = renderHook(() => useSet(groceries));

  expect(result.current.values()).toStrictEqual(groceries.values())
})