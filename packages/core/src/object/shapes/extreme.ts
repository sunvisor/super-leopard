/**
 * Extreme
 *
 * Created by sunvisor on 2025/03/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export function findExtreme<T, U>(
  items: T[],
  calc: (item: T) => U,
  compare: (a: U, b: U) => boolean
): T | undefined {
  if (items.length === 0) return undefined;

  return items.reduce<T | undefined>((result, item) => {
    if (!result) return item;
    return compare(calc(item), calc(result)) ? item : result;
  }, undefined);
}

export function findMinBy<T, U>(items: T[], calc: (item: T) => U): T | undefined {
  return findExtreme(items, calc, (a, b) => a < b);
}

export function findMaxBy<T, U>(items: T[], calc: (item: T) => U): T | undefined {
  return findExtreme(items, calc, (a, b) => a > b);
}
