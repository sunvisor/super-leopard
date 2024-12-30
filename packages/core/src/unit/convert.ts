/**
 * Convert Unit
 *
 * Created by sunvisor on 2024/03/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { UnitValue } from '../object';

const conversionFactors: { [key: string]: number } = {
  mm: 25.4,
  in: 1,
  pt: 72
};

export function convertUnit(value: number, fromUnit: UnitValue, toUnit: UnitValue): number {
  if (fromUnit === toUnit) {
    return value;
  }
  if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
    throw new Error("Invalid units provided.");
  }

  const inchValue = value / conversionFactors[fromUnit];
  return inchValue * conversionFactors[toUnit];
}
