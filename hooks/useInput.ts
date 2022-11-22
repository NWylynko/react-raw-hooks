import { useState } from 'react';

type Options = {
  maxLength?: number;
  minLength?: number;
}

export const useInput = (initialInput: string = "", options: Partial<Options> = {}) => {

  const {
    minLength = undefined,
    maxLength = undefined
  } = options

  if (minLength !== undefined) {
    if (initialInput.length < minLength) {
      throw new Error(`Initial length of value is less then minimum allowed length`)
    }
  }

  if (maxLength !== undefined) {
    if (initialInput.length > maxLength) {
      throw new Error(`Initial length is more than the maximum allowed length`)
    }
  }


  const [value, setValue] = useState<string>(initialInput)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value

    if (maxLength !== undefined) {
      if (newValue.length > maxLength) {
        return;
      }
    }

    if (minLength !== undefined) {
      if (newValue.length < minLength) {
        return;
      }
    }

    setValue(newValue)
  }

  const clear = () => setValue("")
  const reset = () => setValue(initialInput)
  
  return [
    {
      value,
      onChange
    },
    {
      clear,
      reset
    }
  ] as const
}
