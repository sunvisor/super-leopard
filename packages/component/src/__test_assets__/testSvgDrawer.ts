/**
 * TestSvgDrawer
 *
 * Created by sunvisor on 2025/02/12.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { SVG } from '@svgdotjs/svg.js';
import { SvgJsDrawer } from '../svgDriver/SvgJsDriver';

export function createTestSvgDrawer(el?: HTMLElement) {
  const svgJs = SVG().size(500, 500)
  if (el) {
    svgJs.addTo(el);
  }

  return new SvgJsDrawer(svgJs);
}
