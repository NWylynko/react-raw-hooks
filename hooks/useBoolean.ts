import { useEffect, useState } from "react"


export const useBoolean = (initialBoolean: boolean, onChange?: (value: boolean) => void) => {

  const [boolean, setBoolean] = useState(initialBoolean)

  useEffect(() => {
    onChange && onChange(boolean)
  }, [boolean])

  const setTrue = () => {
    setBoolean(true)
  }

  const setFalse = () => {
    setBoolean(false)
  }

  const toggle = () => {
    setBoolean(s => !s)
  }

  const set = setBoolean

  return [
    boolean, {
      setTrue,
      setFalse,
      toggle,
      set
    }
  ] as const

}