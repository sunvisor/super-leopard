import { Svg } from '@svgdotjs/svg.js';

export function getClientRect(svg: Svg, x: number, y: number) {
  const elementRect = svg.node.getBoundingClientRect();
  return {
    x: x - elementRect.x,
    y: y - elementRect.y,
  }
}

export * from './AppendShapeRubberBand';
export * from './EditRubberBand';
export * from './LineRubberBand';
export * from './MoveRubberBand';
export * from './ResizeRubberBand';
export * from './SelectRubberBand';
export * from './append';
