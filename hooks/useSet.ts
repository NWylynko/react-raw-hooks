import { useState } from "react"

export const useSet = <Value, > (initialSet = new Set<Value>()) => {

  const [set, updateSet] = useState(new Set(initialSet));

  const addItem = (value: Value) => {
    updateSet((currentSet) => {
      currentSet.add(value)
      return new Set(currentSet)
    })
  }

  const clearSet = () => {
    updateSet((currentSet) => {
      currentSet.clear()
      return new Set(currentSet)
    })
  }

  const deleteItem = (value: Value) => {
    updateSet((currentSet) => {
      currentSet.delete(value)
      return new Set(currentSet)
    })
  }

  return {
    add: addItem,
    clear: clearSet,
    delete: deleteItem,
    entries: set.entries.bind(set),
    forEach: set.forEach.bind(set),
    has: set.has.bind(set),
    keys: set.keys.bind(set),
    size: set.size,
    values: set.values.bind(set)
  } as Set<Value>

}
