/**
 * RectLayer
 *
 * Created by sunvisor on 2024/01/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  CircleShapeType,
  EllipseShapeType,
  FieldShapeType,
  ImageShapeType,
  LineShapeType,
  RectShapeType,
  Shape,
  TextShapeType,
} from '@sunvisor/super-leopard-core';
import { useAtomValue } from 'jotai';
import { ReadPageAtom, ReadScaleAtom } from '../../../atom/ReportAtom';
import { SettingsAtom } from '../../../atom/SettingsAtom';
import { StylesAtom } from '../../../atom/StylesAtom';
import { AppendShapeRubberBand } from '../../../svg';
import { LayerDiv } from '../../report/layer/Layer';
import { SvgDriver } from '../../../svgDriver';

export type OnAppendHandler = (shape: Shape) => void;

export type AppendShapeType =
  RectShapeType |
  CircleShapeType |
  EllipseShapeType |
  LineShapeType |
  TextShapeType |
  FieldShapeType |
  ImageShapeType;

type Props = {
  shapeType: AppendShapeType;
  onAppend?: OnAppendHandler;
}

export default function AppendShapeLayer(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const svg = useMemo(() => SvgDriver.createDrawer(), []);
  const { shapeType, onAppend } = props;
  const page = useAtomValue(ReadPageAtom);
  const scale = useAtomValue(ReadScaleAtom);
  const settings = useAtomValue(SettingsAtom);
  const styles = useAtomValue(StylesAtom);
  const rubberBand = useMemo(() => {
    return new AppendShapeRubberBand({
      svg,
      scale,
      type: shapeType,
      styles,
      settings,
      onAppend
    });
  }, [onAppend, scale, settings, styles, shapeType, svg])


  const onMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      rubberBand.start(event.clientX, event.clientY);
    },
    [rubberBand]
  );

  useEffect(() => {
    if (ref && ref.current) {
      const width = scale.toPixel(page.width);
      const height = scale.toPixel(page.height);

      svg.init(ref.current, { width, height }).clear();
    }
  }, [page.height, page.width, scale, svg]);

  return (
    <LayerDiv
      ref={ref}
      onMouseDown={onMouseDown}
      className="layer appendShape"
    />
  );
}
