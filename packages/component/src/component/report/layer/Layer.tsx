/**
 * Layer
 *
 * reference https://github.com/svgdotjs/svg.js/issues/740#issuecomment-1182844239
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { useEffect, useMemo, useRef } from "react";
import { createLayerDrawer, DrawModeValue } from '@/svg';
import { FieldValues, Shapes } from '@sunvisor/super-leopard-core';
import styled from '@emotion/styled';
import { SvgDriver } from '@/svgDriver';
import { getSettings } from '@/settings';
import usePage from '@/hooks/usePage';
import useScale from '@/hooks/useScale';

type Props = {
  name: string;
  shapes: Shapes;
  mode: DrawModeValue;
  values?: FieldValues;
  listRecords?: FieldValues[];
  pageNumber?: number;
};

export const LayerDiv = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
});

export default function Layer(props: Props) {
  const {
    shapes,
    mode,
    values,
    listRecords,
    pageNumber,
  } = props;
  const settings = getSettings();
  const wrapperEl = useRef(null);
  const svg = useMemo(() => SvgDriver.createDrawer(), []);
  const { page } = usePage();
  const { scale } = useScale();
  const drawer = useMemo(() => createLayerDrawer({
    svg, page, scale, settings, mode
  }), [svg, page, scale, settings, mode]);

  useEffect(() => {
    if (
      wrapperEl && wrapperEl.current
    ) {
      drawer.init(wrapperEl.current as HTMLElement);
      drawer.drawShapes(shapes, { values, listRecords, pageNumber });
    }
  }, [drawer, listRecords, mode, pageNumber, shapes, values]);

  return (
    <LayerDiv className="layer shapes" ref={wrapperEl}/>
  );
}
