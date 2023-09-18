import { useState, useEffect } from 'react'

const useStorage = (key, initialValue, storageObject) => {
  const [value, setValue] = useState(() => {
    const storedValue =
      storageObject === window.sessionStorage ? sessionStorage.getItem(key) : localStorage.getItem(key)

    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    storageObject !== undefined
      ? storageObject.setItem(key, JSON.stringify(value))
      : localStorage.setItem(key, JSON.stringify(value))
    if (value === undefined) return storageObject.removeItem(key)
  }, [key, value, storageObject])

  const remove = () => setValue(undefined)

  return [value, setValue, remove]
}

export default useStorage
