/**
 * Value Objects
 *
 * Created by sunvisor on 2023/12/05.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type PageMargin = {
  left: number;
  top: number;
}

export type PositionPair = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function normalizeBox(box: Box): Box {
  return {
    x: Math.min(box.x, box.x + box.width),
    y: Math.min(box.y, box.y + box.height),
    width: Math.abs(box.width),
    height: Math.abs(box.height),
  };
}

export function positionsToBox(pos1: Position, pos2: Position): Box {
  return normalizeBox({
    x: pos1.x,
    y: pos1.y,
    width: pos2.x - pos1.x,
    height: pos2.y - pos1.y,
  });
}

/**
 * Maximum value to avoid entering too large a value
 */
export const MAX_SCALE_VALUE = 9999;
