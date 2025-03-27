/**
 * SvgJsDriver
 *
 * Created by sunvisor on 2025/02/12.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  CircleParams,
  EllipseParams,
  ImageParams,
  LineParams,
  RectParams,
  StrokeOptions,
  SvgCircleInterface,
  SvgDrawerInterface,
  SvgDriverInterface,
  SvgEllipseInterface,
  SvgImageInterface,
  SvgLineInterface,
  SvgRectInterface,
  SvgTextInterface,
  TextParams
} from './SvgDriverInterface';
import { Shape as SvgShape, SVG, Svg } from '@svgdotjs/svg.js';
import { Position, Size, StyleType } from '@sunvisor/super-leopard-core';
import { SvgJsCircle, SvgJsEllipse, SvgJsImage, SvgJsLine, SvgJsRect, SvgJsText } from './SvgJsShape';

export const SvgJsDriver: SvgDriverInterface = {
  createDrawer(): SvgDrawerInterface {
    return new SvgJsDrawer(SVG());
  }
}

export class SvgJsDrawer implements SvgDrawerInterface {

  constructor(
    private readonly svg: Svg
  ) {
  }

  init(el: HTMLElement, size?: Size): this {
    this.svg.addTo(el);
    if (size) {
      this.svg.size(size.width, size.height);
    }
    return this;
  }

  circle(params: CircleParams): SvgCircleInterface {
    const { x, y, diameter, stroke, fillColor, opacity } = params;
    const circle = this.svg.circle(diameter)
      .move(x, y);
    this.applyStroke(circle, stroke, opacity);
    this.applyFillColor(circle, fillColor, opacity);
    this.applyDecoration(circle, params);

    return new SvgJsCircle(circle);
  }

  ellipse(params: EllipseParams): SvgEllipseInterface {
    const { x, y, width, height, stroke, fillColor, opacity } = params;
    const ellipse = this.svg.ellipse(width, height)
      .move(x, y);
    this.applyStroke(ellipse, stroke, opacity);
    this.applyFillColor(ellipse, fillColor, opacity);
    this.applyDecoration(ellipse, params);

    return new SvgJsEllipse(ellipse);
  }

  rect(params: RectParams): SvgRectInterface {
    const { x, y, width, height, stroke, fillColor, opacity } = params;
    const rect = this.svg.rect(width, height)
      .move(x, y);
    this.applyStroke(rect, stroke, opacity);
    this.applyFillColor(rect, fillColor, opacity);
    this.applyDecoration(rect, params);

    return new SvgJsRect(rect);
  }

  line(params: LineParams): SvgLineInterface {
    const { x1, y1, x2, y2, stroke, opacity } = params;
    const line = this.svg.line(x1, y1, x2, y2);
    this.applyStroke(line, stroke, opacity);
    this.applyDecoration(line, params);

    return new SvgJsLine(line);
  }

  text(params: TextParams): SvgTextInterface {
    const { x, y, font, letterSpacing, textDecoration, fillColor, opacity } = params;
    const text = this.svg.text(params.text)
      .font(font)
    if (letterSpacing) {
      text.attr('letter-spacing', letterSpacing);
    }
    if (textDecoration) {
      text.attr('text-decoration', textDecoration);
    }
    text.fill(fillColor);
    text.opacity(opacity || 1);
    this.applyDecoration(text, params);
    const bbox = text.bbox();
    // adjust font top axis
    const offsetY = (bbox.height - font.size) / 2;
    text.move(x, y - offsetY);

    return new SvgJsText(text);
  }

  image(params: ImageParams): SvgImageInterface {
    const { src, x, y, width, height, opacity } = params;
    const image = this.svg.image(src)
      .size(width, height)
      .move(x, y)
      .opacity(opacity || 1);
    this.applyDecoration(image, params);

    return new SvgJsImage(image);
  }

  find(selector: string): SvgShape[] {
    return this.svg.find(selector);
  }

  clear() : this {
    this.svg.clear();
    return this;
  }

  on(event: string | Event[], callback: EventListener, bind?: any): this {
    this.svg.on(event, callback, bind);
    return this;
  }

  off(event: string | Event[]) : this {
    this.svg.off(event);
    return this;
  }

  css(css: Partial<CSSStyleDeclarationWithVars>): this {
    this.svg.css(css);
    return this;
  }

  getClientPosition({ x, y }: Position): Position {
    const elementRect = this.svg.node.getBoundingClientRect();
    return {
      x: x - elementRect.x,
      y: y - elementRect.y,
    }

  }

  private applyStroke(el: SvgShape, stroke: StrokeOptions | undefined, opacity?: number): SvgShape {
    if (!stroke) return el;
    el.stroke({
      color: stroke.color,
      width: stroke.width,
      linecap: stroke.cap,
      linejoin: stroke.join,
      opacity: opacity || 1,
    });
    if (stroke.style === StyleType.DASHED) {
      el.attr({ 'stroke-dasharray': '4' });
    }
    if (stroke.style === StyleType.DOTTED) {
      el.attr({ 'stroke-dasharray': '1 2' });
    }

    return el;
  }

  private applyFillColor(el: SvgShape, fillColor: string | undefined, opacity?: number | undefined): SvgShape {
    el.fill({
      color: fillColor || 'none',
      opacity: opacity || 1,
    });

    return el;
  }

  private applyDecoration(el: SvgShape, { css, classes }: {
    css?: Partial<CSSStyleDeclarationWithVars>;
    classes?: string[];
  }) {
    if (css) el.css(css);
    if (classes) {
      classes.forEach(cls => el.addClass(cls));
    }
  }
}
