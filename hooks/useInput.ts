import { useState } from 'react';




export const useInput = (initialInput: string = "") => {
  const [value, setValue] = useState<string>(initialInput)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }
  
  return {
    value,
    onChange
  }
}
