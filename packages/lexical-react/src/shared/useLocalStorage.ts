/* eslint-disable header/header */
import * as React from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = React.useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [localState, setLocalState] = React.useState(readValue);
  const handleSetState = React.useCallback(
    (value: T) => {
      try {
        const nextState =
          typeof value === 'function' ? value(localState) : value;
        window.localStorage.setItem(key, JSON.stringify(nextState));
        setLocalState(nextState);
        window.dispatchEvent(new Event('local-storage'));
      } catch (e) {
        console.warn(e);
      }
    },
    [key, localState],
  );

  const onStorageChange = React.useCallback(() => {
    setLocalState(readValue());
  }, [readValue]);

  React.useEffect(() => {
    window.addEventListener('storage', onStorageChange);
    window.addEventListener('local-storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
      window.removeEventListener('local-storage', onStorageChange);
    };
  }, [onStorageChange]);

  return [localState, handleSetState] as const;
}
