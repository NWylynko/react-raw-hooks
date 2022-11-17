import { expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useBoolean } from './useBoolean';

it("should set the boolean to true", () => {
  const { result } = renderHook(() => useBoolean(false));

  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[1].setTrue()
  })

  expect(result.current[0]).toBe(true)
})

it("should set the boolean to false", () => {
  const { result } = renderHook(() => useBoolean(true));

  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1].setFalse()
  })

  expect(result.current[0]).toBe(false)
})


it("should toggle the boolean", () => {
  const { result } = renderHook(() => useBoolean(true));

  act(() => {
    result.current[1].toggle()
  })

  expect(result.current[0]).toBe(false)
})