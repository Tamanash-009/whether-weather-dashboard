import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const rawValue = window.localStorage.getItem(key);

      return rawValue ? JSON.parse(rawValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore storage write failures such as private mode restrictions.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
