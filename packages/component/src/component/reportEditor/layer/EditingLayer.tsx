/**
 * EditingLayer
 *
 * Created by sunvisor on 2024/01/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SVG } from '@svgdotjs/svg.js';
import { useAtomValue } from 'jotai';
import {
  createEditingLayerDrawer,
  OnMoveHandler,
  OnMovePositionHandler,
  OnResizeHandler,
  OnSelectHandler
} from '../../../svg';
import { ReadPageAtom, ReadScaleAtom } from '../../../atom/ReportAtom';
import { SettingsAtom } from '../../../atom/SettingsAtom';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import { LayerDiv } from '../../report/layer/Layer';

type Props = {
  onSelect?: OnSelectHandler;
  onMove?: OnMoveHandler;
  onResize?: OnResizeHandler;
  onMovePosition?: OnMovePositionHandler;
}

/**
 * Represents an editing layer for handling selection, movement, resizing,
 * and other editing operations.
 *
 * @param {Props} props - The properties object containing page, selection, and event handlers.
 * @return The React element representing the editing layer.
 */
export default function EditingLayer(props: Props) {
  const { onSelect, onMove, onResize, onMovePosition } = props;
  const selection = useAtomValue(SelectionAtom);
  const page = useAtomValue(ReadPageAtom);
  const scale = useAtomValue(ReadScaleAtom);
  const ref = useRef<HTMLDivElement>(null);
  const svg = useMemo(() => SVG(), []);
  const settings = useAtomValue(SettingsAtom);
  const { drawer, handler } = useMemo(
    () => createEditingLayerDrawer(
      {
        svg, scale, page, selection, settings, listeners: {
          onSelect,
          onMove,
          onResize,
          onMovePosition,
        }
      }
    ), [svg, scale, page, selection, settings, onSelect, onMove, onResize]);

  const onMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.button === 0) {
        handler.startRubberBand(event.clientX, event.clientY);
      }
      event.preventDefault();
      event.stopPropagation();
    },
    [handler]
  );

  useEffect(() => {
    if (ref && ref.current) {
      drawer.init(ref.current);
      drawer.showBindingBox();
      return () => {
        drawer.clear();
      }
    }
  }, [drawer, page, scale, selection]);

  return (
    <LayerDiv
      ref={ref}
      onMouseDown={onMouseDown}
      className="layer editing"
    />
  );
}
