/**
 * usePropertyStates
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useState } from 'react';

export type ChangeValueHandler<T> = (key: string, value: T, update?: boolean) => void;

export default function usePropertyStates<T>(initialStates: T, onUpdate: (value: T) => void) {
  const [states, setStates] = useState<T>(initialStates);

  const setValues = useCallback((newStates: T) => {
    setStates(prev => ({
      ...prev,
      ...newStates
    }));
  }, []);

  const handleChangeValue = useCallback(
    (name: string, value: T[keyof T], update?: boolean) => {
      const newStates = { ...states, [name]: value };
      setValues(
        newStates
      );
      if (update) {
        onUpdate(newStates);
      }
    },
    [onUpdate, setValues, states]
  );

  return { values: states, setValues, handleChangeValue };
}
