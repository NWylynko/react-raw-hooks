import { expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useMap } from "./useMap";

const userInventory = new Map<string, number>([
  ["apple", 32],
  ["orange", 64],
  ["pear", 24],
  ["banana", 21],
  ["strawberry", 45],
]);

it("should accept an initial map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  expect(result.current.size).toBe(userInventory.size);
});

it("should iterate over the entries", () => {
  const { result } = renderHook(() => useMap(userInventory));

  const originalIterator = userInventory.entries();
  const iterator = result.current.entries();

  for (let i = 0; i < userInventory.size; i++) {
    expect(originalIterator.next().value).toStrictEqual(iterator.next().value);
  }
});

it("should report the correct size", () => {
  const { result } = renderHook(() => useMap(userInventory));

  expect(result.current.size).toBe(userInventory.size);
});

it("should forEach over the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  const original: number[] = [];
  const hooked: number[] = [];

  userInventory.forEach((item) => {
    original.push(item);
  });

  result.current.forEach((item) => {
    hooked.push(item);
  });

  expect(original).toStrictEqual(hooked);
});

it("should get an item out of the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  expect(userInventory.get("apple")).toBe(result.current.get("apple"));
});

it("should find an item in the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  expect(userInventory.has("orange")).toBe(result.current.has("orange"));
});

it("should get the keys from the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  expect(userInventory.keys()).toStrictEqual(result.current.keys());
});

it("should get the values from the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  expect(userInventory.values()).toStrictEqual(result.current.values());
});

it("should clear the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  act(() => {
    result.current.clear();
  });

  expect(result.current.size).toBe(0);
  expect(result.current.has("banana")).toBe(false);
  expect(result.current.get("orange")).toBe(undefined);
  expect(result.current.values().next().value).toBe(undefined);
  expect(result.current.keys().next().value).toBe(undefined);
});

it("should delete an item from the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  act(() => {
    result.current.delete("pear");
  });

  expect(result.current.size).toBe(userInventory.size - 1);
  expect(result.current.has("pear")).toBe(false);
  expect(result.current.get("pear")).toBe(undefined);
});

it("should add an item into the map", () => {
  const { result } = renderHook(() => useMap(userInventory));

  act(() => {
    result.current.set("raspberry", 55);
  });

  expect(result.current.size).toBe(userInventory.size + 1);
  expect(result.current.has("raspberry")).toBe(true);
  expect(result.current.get("raspberry")).toBe(55);
});
