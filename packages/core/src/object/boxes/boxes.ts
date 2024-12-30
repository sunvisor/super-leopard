import { Box, Position } from '../../value';
import { Boxable } from '../shape';

export function mergeBoxes(items: Boxable[]): Box {
  if (items.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  return items.reduce((bbox, item) => {
    const y2 = bbox.y + bbox.height;
    const x2 = bbox.x + bbox.width;
    const newY2 = item.bbox.y + item.bbox.height;
    const newX2 = item.bbox.x + item.bbox.width;

    return {
      x: Math.min(bbox.x, item.bbox.x),
      y: Math.min(bbox.y, item.bbox.y),
      width: Math.max(x2, newX2) - Math.min(bbox.x, item.bbox.x),
      height: Math.max(y2, newY2) - Math.min(bbox.y, item.bbox.y),
    }
  }, items[0].bbox);
}

export function moveBoxes(pos: Position, items: Boxable[]): ThisType<Boxable[]> {
  const bbox = mergeBoxes(items);
  const deltaX = pos.x - bbox.x;
  const deltaY = pos.y - bbox.y;

  return items.map(item => {
    return item.moveTo({
      x: item.bbox.x + deltaX,
      y: item.bbox.y + deltaY
    });
  });
}

export function resizeBoxes(box: Box, items: Boxable[]): ThisType<Boxable[]> {
  const bbox = mergeBoxes(items);
  const xRate = bbox.width === 0 ? 0 : box.width / bbox.width;
  const yRate = bbox.height === 0 ? 0 : box.height / bbox.height;

  return items.map(item => {
    const dx = item.bbox.x - bbox.x;
    const dy = item.bbox.y - bbox.y;
    return item.resize({
      x: box.x + xRate * dx,
      y: box.y + yRate * dy,
      width: bbox.width === 0 ? box.width : item.bbox.width * xRate,
      height: bbox.height === 0 ? box.height : item.bbox.height * yRate,
    });
  });
}

/**
 * Determines whether the target box is completely inside the range box.
 *
 * @param {Box} targetBox - The target box to check.
 * @param {Box} rangeBox - The range box to compare against.
 * @return {boolean} Returns true if the target box is inside the range box, otherwise false.
 */
export function boxIsInTheBox(targetBox: Box, rangeBox: Box): boolean {
  return (
    targetBox.x >= rangeBox.x &&
    targetBox.y >= rangeBox.y &&
    targetBox.x + targetBox.width <= rangeBox.x + rangeBox.width &&
    targetBox.y + targetBox.height <= rangeBox.y + rangeBox.height
  );
}

export function positionIsInTheBox(pos: Position, box: Box): boolean {
  return (
    pos.x >= box.x &&
    pos.y >= box.y &&
    pos.x <= box.x + box.width &&
    pos.y <= box.y + box.height
  );
}
