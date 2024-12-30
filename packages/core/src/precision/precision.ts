/**
 * Precision
 *
 * Created by sunvisor on 2024/02/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */

export const INTERNAL_PRECISION = 1000; // 3 decimal places

export function internalValue(value: number): number {
  return Math.round(value * INTERNAL_PRECISION);
}

export function externalValue(value: number): number {
  return value / INTERNAL_PRECISION;
}

export function partial(value: number | undefined, fn: (value: number) => number): number | undefined {
  if (value === undefined) {
    return undefined;
  }
  return fn(value);
}
