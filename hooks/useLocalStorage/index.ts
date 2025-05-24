"use client"

import { useState, useEffect } from "react"

type StorageValue<T> = {
  value: T
  expiry: number
}

export function useLocalStorage<T>(key: string, initialValue: T, expiryMinutes = 15) {
  const getStoredValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)

      if (!item) {
        return initialValue
      }

      const storedItem: StorageValue<T> = JSON.parse(item)

      if (Date.now() > storedItem.expiry) {
        window.localStorage.removeItem(key)
        return initialValue
      }

      return storedItem.value
    } catch (error) {
      console.error("Erro ao recuperar do localStorage:", error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    setStoredValue(getStoredValue())
  }, [])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== "undefined") {
        const item: StorageValue<T> = {
          value: valueToStore,
          expiry: Date.now() + expiryMinutes * 60 * 1000,
        }

        window.localStorage.setItem(key, JSON.stringify(item))
      }
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error)
    }
  }

  return [storedValue, setValue] as const
}
