import { Border, Scale } from '@sunvisor/super-leopard-core';
import { StrokeOptions } from '../svgDriver';


export function borderToStroke(scale: Scale, border: Border | undefined): StrokeOptions | undefined {
  if (!border) return undefined;
  return  {
    color: border.color?.color,
    width: scale.pointToPixel(border.width),
    cap: border.cap,
    join: border.join,
    style: border.style
  }
}
