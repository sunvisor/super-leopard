/**
 * Order functions
 *
 * Created by sunvisor on 2023/12/09.
 * Copyright (C) Sunvisor Lab. 2023.
 */


export function bringToFront<T>(target: T, items: T[]): T[] {
  items.indexOf(target);
  const newArray = items.filter(item => item !== target);
  newArray.push(target);

  return newArray;
}

export function sendToBack<T>(target: T, items: T[]): T[] {
  items.indexOf(target);
  const newArray = items.filter(item => item !== target);
  newArray.unshift(target);
  return newArray;
}

export function bringToForward<T>(target: T, items: T[]): T[] {
  const index = items.indexOf(target);
  const newArray = items.filter(item => item !== target);
  newArray.splice(index + 1, 0, target);
  return newArray;
}

export function sendToBackward<T>(target: T, items: T[]): T[] {
  const index = items.indexOf(target);
  const newArray = items.filter(item => item !== target);
  newArray.splice(index - 1, 0, target);
  return newArray;
}
