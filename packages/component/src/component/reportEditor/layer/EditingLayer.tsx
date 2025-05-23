/**
 * EditingLayer
 *
 * Created by sunvisor on 2024/01/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  createEditingLayerDrawer,
  OnMoveHandler,
  OnMovePositionHandler,
  OnResizeHandler,
  OnSelectHandler
} from '@/svg';
import { LayerDiv } from '@/component/report/layer/Layer';
import { SvgDriver } from '@/svgDriver';
import { getSettings } from '@/settings';
import usePage from '@/hooks/usePage';
import useScale from '@/hooks/useScale';
import useSelection from '@/hooks/useSelection';

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
  const { selection } = useSelection();
  const { page } = usePage();
  const { scale } = useScale();
  const ref = useRef<HTMLDivElement>(null);
  const svg = useMemo(() => SvgDriver.createDrawer(), []);
  const settings = getSettings();
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
      (document.activeElement as HTMLElement).blur();
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
