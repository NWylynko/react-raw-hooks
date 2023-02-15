import { useState } from "react";

export const useMap = <Key, Value>(initialMap = new Map<Key, Value>()) => {
  const [map, setMap] = useState(new Map(initialMap));

  const clearMap = () => {
    setMap((currentMap) => {
      currentMap.clear();
      return new Map(currentMap);
    });
  };

  const deleteItem = (key: Key) => {
    setMap((currentMap) => {
      currentMap.delete(key);
      return new Map(currentMap);
    });
  };

  const setItem = (key: Key, value: Value) => {
    setMap((currentMap) => {
      currentMap.set(key, value);
      return new Map(currentMap);
    });
  };

  return {
    size: map.size,
    entries: map.entries.bind(map),
    forEach: map.forEach.bind(map),
    get: map.get.bind(map),
    has: map.has.bind(map),
    keys: map.keys.bind(map),
    values: map.values.bind(map),
    clear: clearMap,
    delete: deleteItem,
    set: setItem,
  } as Map<Key, Value>;
};
