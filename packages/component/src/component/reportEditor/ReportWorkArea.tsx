/**
 * ReportEditor
 *
 * This component manipulates SVG dom.
 * So It should be loaded as pure client component.
 *
 * Created by sunvisor on 2024/01/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import { DrawModeType } from '@/svg';
import EditingLayer from './layer/EditingLayer';
import AppendShapeLayer, { AppendShapeType } from './layer/AppendShapeLayer';
import useShapes from '@/hooks/useShapes';
import useKeyboard from '@/hooks/useKeyboard';
import useReportManipulator from '@/hooks/useReportManipulator';
import useReport from '@/hooks/useReport';
import useLayer from '@/hooks/useLayer';
import useZoom from '@/hooks/useZoom';
import { isMac } from '../environment';
import contractShapes from '../report/layer/contractShapes';
import ReportPaper from '../report/paper/ReportPaper';
import Layer from '../report/layer/Layer';
import { Box, Position, Shape } from '@sunvisor/super-leopard-core';


export type EditMode = AppendShapeType | 'edit';

type Props = {
  mode: EditMode;
  zoom: number;
  afterAppend: (shape: Shape) => void;
}

export default function ReportWorkArea(props: Props) {
  const { mode, zoom, afterAppend } = props;
  const { report } = useReport()
  const { activeLayerIndex } = useLayer();
  const layers = useMemo(
    () => contractShapes(report.layers),
    [report.layers]
  );
  const { setZoom } = useZoom();

  useEffect(() => {
    setZoom(zoom)
  }, [zoom, setZoom]);

  const { shapes } = useShapes();

  const {
    append, select, move, resize, movePosition,
    copy, paste, remove, cut, undo, redo, selectAll,
  } = useReportManipulator();

  const onSelect = useCallback((area: Box | Position, event: MouseEvent) => {
    const isCmdOrCtrl = isMac() ? event?.metaKey : event?.ctrlKey;
    select(area, isCmdOrCtrl);
  }, [select]);

  const listeners = useMemo(
    () => ({
      onSelect, onMove: move, onResize: resize, onMovePosition: movePosition, onSelectAll: selectAll
    }),
    [onSelect, move, resize, selectAll])

  useKeyboard({
    onCopy: copy, onPaste: paste, onRemove: remove, onCut: cut, onUndo: undo, onRedo: redo, onSelectAll: selectAll
  }, isMac());

  const handleAppend = useCallback((shape: Shape) => {
    append(shape);
    afterAppend(shape);
  }, [append, afterAppend]);

  return (
    <ReportPaper>
      {
        layers.map((layer, index) => {
          const isActive = index === activeLayerIndex;
          const name = layer.name;
          const layerShapes = isActive ? shapes : layer.shapes;
          return (
            <Layer
              key={name}
              name={name}
              shapes={layerShapes}
              mode={DrawModeType.DESIGN}
            />
          );
        })
      }
      {
        (mode === 'edit') && <EditingLayer
          {...listeners}
        />
      }
      {
        (
          mode !== 'edit'
        ) && <AppendShapeLayer
          shapeType={mode}
          onAppend={handleAppend}
        />
      }
    </ReportPaper>
  );
}
