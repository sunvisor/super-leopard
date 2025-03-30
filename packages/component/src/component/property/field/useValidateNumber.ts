/**
 * UseValidateNumber
 *
 * Created by sunvisor on 2024/02/28.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useState } from 'react';
import translation from '@/translations/translation';

type Props = {
  minValue?: number,
  maxValue?: number,
}


export default function useValidateNumber(props: Props) {
  const { minValue, maxValue } = props;
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const t = translation().numberErrorMessage;

  const validate = (value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      setError(true);
      setMessage(t.invalidValue);
      return false;
    }
    if (minValue !== undefined && numValue < minValue) {
      setError(true);
      setMessage(t.minValue(minValue));
      return false;
    }
    if (maxValue !== undefined && numValue > maxValue) {
      setError(true);
      setMessage(t.maxValue(maxValue));
      return false;
    }
    setError(false);
    setMessage('');
    return true;
  }

  return {
    error, message, validate
  }
}
