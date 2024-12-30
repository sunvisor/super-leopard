/**
 * UseValidateNumber
 *
 * Created by sunvisor on 2024/02/28.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useState } from 'react';
import { getNumberErrorMessage } from '../../../captions/getCaptions';

type Props = {
  minValue?: number,
  maxValue?: number,
}


export default function useValidateNumber(props: Props) {
  const { minValue, maxValue } = props;
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const captions = getNumberErrorMessage();

  const validate = (value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      setError(true);
      setMessage(captions.invalidValue);
      return false;
    }
    if (minValue !== undefined && numValue < minValue) {
      setError(true);
      setMessage(captions.minValue(minValue));
      return false;
    }
    if (maxValue !== undefined && numValue > maxValue) {
      setError(true);
      setMessage(captions.maxValue(maxValue));
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
