/**
 * Validator
 *
 * Created by sunvisor on 2024/04/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
type ValidateType = 'positive' | 'moreThanZero';
export default function validate(type: ValidateType, name: string, value: any) {
  switch (type) {
    case 'positive':
      if (value < 0) {
        throw new Error(`${name} must be positive: ${value}`);
      }
      break;
    case 'moreThanZero':
      if (value <= 0) {
        throw new Error(`${name} must be more than 0: ${value}`);
      }
      break;
  }
}
