import { Shape as SvgShape } from "@svgdotjs/svg.js"
import { Border,  StyleType, Scale, Color } from '@sunvisor/super-leopard-core';

/**
 * Applies a border to a given SVG shape element.
 *
 * @param {Scale} scale - The scale used for converting the border width from point to pixel.
 * @param {SvgShape} element - The SVG shape element to apply the border to.
 * @param {Border} [border] - The border options.
 * @param {number} [opacity=1] - The opacity of the border.
 *
 * @return {SvgShape} - The updated SVG shape element with the applied border.
 */
export function applyBorder(
  scale: Scale,element: SvgShape, border?: Border, opacity: number = 1
): SvgShape {
  if (!border) return element;
  element.stroke({
    color: border.color?.color,
    width: scale.pointToPixel(border.width),
    linecap: border.cap,
    linejoin: border.join,
    opacity,
  });
  if (border.style === StyleType.DASHED) {
    element.attr({ 'stroke-dasharray': '4' });
  }
  if (border.style === StyleType.DOTTED) {
    element.attr({ 'stroke-dasharray': '1 2' });
  }

  return element;
}

/**
 * Applies a fill color to an SVG shape element.
 *
 * @param {SvgShape} element - The SVG shape element to apply the fill color to.
 * @param {Color} [color] - The color to fill the element. If not provided, the fill color will be set to 'none'.
 * @param {number} [opacity=1] - The opacity of the fill color, ranging from 0 (transparent) to 1 (opaque).
 *
 * @returns {SvgShape} - The updated shape element with the applied fill color.
 */
export function applyFillColor(
  element: SvgShape, color?: Color, opacity: number = 1
): SvgShape {
  element.fill({
    color: color ? color.color : 'none',
    opacity
  });

  return element;
}
