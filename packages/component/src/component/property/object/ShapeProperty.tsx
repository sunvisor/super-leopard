/**
 * ShapeProperty
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useMemo } from "react";
import {
  Circle,
  Ellipse,
  Field,
  Group,
  Image,
  Line,
  List,
  Rect,
  Shape,
  Shapes,
  Text,
  UnitValue
} from '@sunvisor/super-leopard-core';
import CircleProperty from './CircleProperty';
import EllipseProperty from './EllipseProperty';
import FieldProperty from './FieldProperty';
import GroupProperty from './GroupProperty';
import ImageProperty from './ImageProperty';
import LineProperty from './LineProperty';
import ListProperty from './ListProperty';
import RectProperty from './RectProperty';
import TextProperty from './TextProperty';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import useShapes from '../../reportEditor/hooks/useShapes';
import { FontList } from '../../../font';


export type UpdateHandler = (target: Shape, updated: Shape) => void;

type Props = {
  unit: UnitValue;
  shape: Shape;
  apiBaseUrl: string;
  fontList: FontList;
}

export default function ShapeProperty(props: Props) {
  const { unit, shape, apiBaseUrl, fontList } = props;
  const selection = useAtomValue(SelectionAtom);
  const setSelection = useSetAtom(SelectionAtom);
  const { updateShapes } = useShapes();

  const handleUpdate = useCallback(
    (oldShape: Shape, newShape: Shape) => {
      if (oldShape.equals(newShape)) return;
      const newShapes = new Shapes([newShape]);
      updateShapes(selection, newShapes);
      setSelection(newShapes);
    },
    [updateShapes, selection, setSelection]
  );

  return useMemo(() => {
      switch (shape.type) {
        case 'circle':
          return <CircleProperty unit={unit} shape={shape as Circle} onUpdate={handleUpdate}/>;
        case 'ellipse':
          return <EllipseProperty unit={unit} shape={shape as Ellipse} onUpdate={handleUpdate}/>;
        case 'field':
          return <FieldProperty unit={unit} shape={shape as Field} fontList={fontList} apiBaseUrl={apiBaseUrl} onUpdate={handleUpdate}/>;
        case 'group':
          return <GroupProperty unit={unit} shape={shape as Group} onUpdate={handleUpdate}/>;
        case 'image':
          return <ImageProperty unit={unit} shape={shape as Image} onUpdate={handleUpdate} apiBaseUrl={apiBaseUrl} />;
        case 'line':
          return <LineProperty unit={unit} shape={shape as Line} onUpdate={handleUpdate}/>;
        case 'list':
          return <ListProperty unit={unit} shape={shape as List} onUpdate={handleUpdate}/>;
        case 'rect':
          return <RectProperty unit={unit} shape={shape as Rect} onUpdate={handleUpdate}/>;
        case 'text':
          return <TextProperty unit={unit} shape={shape as Text} fontList={fontList} onUpdate={handleUpdate}/>;
        default:
          return null;
      }
    },
    [shape, unit, handleUpdate, fontList, apiBaseUrl]
  );
}
