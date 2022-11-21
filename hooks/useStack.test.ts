import { expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useStack } from './useStack';

it('Add to stack', () => {
  const { result } = renderHook(() => useStack<string>())

  expect(result.current.stack.length).toBe(0)

  act(() => {
    result.current.add("/about")
  })

  expect(result.current.stack.length).toBe(1)

})

it('Backwards / Forwards Stack', () => {
  const { result } = renderHook(() => useStack<string>(["/", "/dashboard", "/settings"]))

  expect(result.current.canMoveBackwards).toBe(true)
  expect(result.current.canMoveForwards).toBe(false)
  expect(result.current.stack.length).toBe(3)
  expect(result.current.topOfStack).toBe("/settings")

  act(() => {
    result.current.back()
  })

  expect(result.current.canMoveBackwards).toBe(true)
  expect(result.current.canMoveForwards).toBe(true)
  expect(result.current.stack.length).toBe(2)
  expect(result.current.topOfStack).toBe("/dashboard")

  act(() => {
    result.current.back()
    result.current.back()
  })

  expect(result.current.canMoveBackwards).toBe(false)
  expect(result.current.canMoveForwards).toBe(true)
  expect(result.current.stack.length).toBe(0)
  expect(result.current.topOfStack).toBe(undefined)

  act(() => {
    result.current.forward()
  })

  expect(result.current.canMoveBackwards).toBe(true)
  expect(result.current.canMoveForwards).toBe(true)
  expect(result.current.stack.length).toBe(1)
  expect(result.current.topOfStack).toBe("/")

  act(() => {
    result.current.forward()
    result.current.forward()
  })

  expect(result.current.canMoveBackwards).toBe(true)
  expect(result.current.canMoveForwards).toBe(false)
  expect(result.current.stack.length).toBe(3)
  expect(result.current.topOfStack).toBe("/settings")

})

it('respects the minimum stack count', () => {
  const { result } = renderHook(() => useStack<string>(["/", "/dashboard"], { minStackCount: 1 }))

  expect(result.current.canMoveBackwards).toBe(true)

  act(() => {
    result.current.back()
  })

  expect(result.current.canMoveBackwards).toBe(false)

  act(() => {
    result.current.add("/settings")
  })

  expect(result.current.canMoveBackwards).toBe(true)
})