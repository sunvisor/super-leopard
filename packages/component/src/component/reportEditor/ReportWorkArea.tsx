/**
 * ReportEditor
 *
 * This component manipulates SVG dom.
 * So It should be loaded as pure client component.
 *
 * Created by sunvisor on 2024/01/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useEffect, useMemo } from "react";
import ReportPaper from '../report/paper/ReportPaper';
import Layer from '../report/layer/Layer';
import { DrawModeType } from '../../svg';
import EditingLayer from './layer/EditingLayer';
import AppendShapeLayer, { AppendShapeType } from './layer/AppendShapeLayer';
import useShapes from '../reportEditor/hooks/useShapes';
import useKeyboard from '../reportEditor/hooks/useKeyboard';
import useEventHandler from '../reportEditor/hooks/useEventHandler';
import { isMac } from '../environment';
import contractShapes from '../report/layer/contractShapes';
import useReport from '../../hooks/useReport';
import useLayer from '../../hooks/useLayer';
import useZoom from '../../hooks/useZoom';


export type EditMode = AppendShapeType | 'edit';

type Props = {
  mode: EditMode;
  zoom: number;
}

export default function ReportWorkArea(props: Props) {
  const { mode, zoom } = props;
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
    onAppend, onSelect, onMove, onResize, onMovePosition,
    onCopy, onPaste, onRemove, onCut, onUndo, onRedo
  } = useEventHandler();

  const listeners = useMemo(
    () => ({
      onSelect, onMove, onResize, onMovePosition
    }),
    [onSelect, onMove, onResize])

  useKeyboard({
    onCopy, onPaste, onRemove, onCut, onUndo, onRedo
  }, isMac());

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
          onAppend={onAppend}
        />
      }
    </ReportPaper>
  );
}
