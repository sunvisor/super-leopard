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
import { useAtomValue, useSetAtom } from 'jotai';
import { ReadActiveLayerIndexAtom, ReadReportAtom, SetZoomAtom } from '../../atom/ReportAtom';
import useKeyboard from '../reportEditor/hooks/useKeyboard';
import useEventHandler from '../reportEditor/hooks/useEventHandler';
import { isMac } from '../environment';
import contractShapes from '../report/layer/contractShapes';
import { GetSvgImagePath } from '../../svg';

export type EditMode =
  AppendShapeType | 'edit';

type Props = {
  mode: EditMode;
  zoom: number;
  getImageUrl: GetSvgImagePath;
}

export default function ReportWorkArea(props: Props) {
  const {
    mode, zoom, getImageUrl
  } = props;
  const report = useAtomValue(ReadReportAtom)
  const activeLayerIndex = useAtomValue(ReadActiveLayerIndexAtom);
  const layers = useMemo(
    () => contractShapes(report.layers),
    [report.layers]
  );
  const setZoom = useSetAtom(SetZoomAtom);

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
                getImageUrl={getImageUrl}
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
