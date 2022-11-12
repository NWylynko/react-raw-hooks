import { expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';

import { useCount } from "./useCount"

it('should increment the count', () => {
  const { result } = renderHook(() => useCount());

  act(() => {
    result.current[1].increment();
  })
  
  expect(result.current[0]).toBe(1);
});


it('should decrement the count', () => {
  const { result } = renderHook(() => useCount());

  act(() => {
    result.current[1].decrement();
  })
  
  expect(result.current[0]).toBe(-1);
})

it('Should add to the count', () => {
  const { result } = renderHook(() => useCount());

  act(() => {
    result.current[1].add(10);
  })
  
  expect(result.current[0]).toBe(10);
})

it('Should subtract from the count', () => {
  const { result } = renderHook(() => useCount());

  act(() => {
    result.current[1].subtract(10);
  })
  
  expect(result.current[0]).toBe(-10);
})

it('Should reset the count', () => {
  const { result } = renderHook(() => useCount(15));

  act(() => {
    result.current[1].reset();
  })
  
  expect(result.current[0]).toBe(15);
})

it('Should use setCount on the count', () => {
  const { result } = renderHook(() => useCount(5));

  act(() => {
    result.current[1].setCount(n => n + 15)
  })
  
  expect(result.current[0]).toBe(20);
})

it('shouldnt go above max amount (positive number)', () => {
  const { result } = renderHook(() => useCount(5, { max: 50 }));

  act(() => {
    result.current[1].add(100);
  })
  
  expect(result.current[0]).toBe(50);
})

it('shouldnt go above max amount (negative number)', () => {
  const { result } = renderHook(() => useCount(-1000, { max: -500 }));

  act(() => {
    result.current[1].add(2500);
  })
  
  expect(result.current[0]).toBe(-500);
})

it('shouldnt go below min amount (positive number)', () => {
  const { result } = renderHook(() => useCount(100, { min: 50 }));

  act(() => {
    result.current[1].subtract(200);
  })
  
  expect(result.current[0]).toBe(50);
})

it('shouldnt go below min amount (negative number)', () => {
  const { result } = renderHook(() => useCount(-25, { min: -50 }));

  act(() => {
    result.current[1].subtract(200);
  })
  
  expect(result.current[0]).toBe(-50);
})

it('should increment by custom step', () => {
  const { result } = renderHook(() => useCount(5, { step: 5 }));

  act(() => {
    result.current[1].increment();
  })
  
  expect(result.current[0]).toBe(10);
})

it('should decrement by custom step', () => {
  const { result } = renderHook(() => useCount(5, { step: 5 }));

  act(() => {
    result.current[1].decrement();
  })
  
  expect(result.current[0]).toBe(0);
})

it('should be set to initial count', () => {
  const { result } = renderHook(() => useCount(5));
  
  expect(result.current[0]).toBe(5);
})

it('should be count of 0 by default', () => {
  const { result } = renderHook(() => useCount());
  
  expect(result.current[0]).toBe(0);
})