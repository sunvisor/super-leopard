/**
 * Layer
 *
 * reference https://github.com/svgdotjs/svg.js/issues/740#issuecomment-1182844239
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { useEffect, useMemo, useRef } from "react";
import { SVG } from '@svgdotjs/svg.js';
import { createLayerDrawer, DrawModeValue, GetSvgImagePath } from '../../../svg';
import { FieldValues, Shapes } from '@sunvisor/super-leopard-core';
import { useAtomValue } from 'jotai';
import { ReadPageAtom, ReadScaleAtom } from '../../../atom/ReportAtom';
import { SettingsAtom } from '../../../atom/SettingsAtom';
import styled from '@emotion/styled';

type Props = {
  name: string;
  shapes: Shapes;
  mode: DrawModeValue;
  values?: FieldValues;
  listRecords?: FieldValues[];
  pageNumber?: number;
  getImageUrl: GetSvgImagePath;
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
    getImageUrl,
  } = props;
  const settings = useAtomValue(SettingsAtom);
  const wrapperEl = useRef(null);
  const svg = useMemo(() => SVG(), []);
  const page = useAtomValue(ReadPageAtom);
  const scale = useAtomValue(ReadScaleAtom);
  const drawer = useMemo(() => createLayerDrawer({
    svg, page, scale, settings, getImagePath: getImageUrl, mode
  }), [svg, page, scale, settings, getImageUrl, mode]);

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
