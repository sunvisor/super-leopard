/**
 * FieldProperty
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createField,
  Field,
  FieldData,
  serializeShape,
  ShapeData,
  StaticShapeType,
  UnitValue
} from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import PropertyBox from './PropertyBox';
import FieldNameFields from '../fieldGroup/FieldNameFields';
import TextPanel from '../panel/TextPanel';
import { FontList } from '../../../font';
import CirclePanel from '../panel/CirclePanel';
import EllipsePanel from '../panel/EllipsePanel';
import ImagePanel from '../panel/ImagePanel';
import LinePanel from '../panel/LinePanel';
import RectPanel from '../panel/RectPanel';
import { useAtomValue } from 'jotai';
import { StylesAtom } from '../../../atom/StylesAtom';
import { UpdateHandler } from './ShapeProperty';
import BarcodePanel from '../panel/BarcodePanel';
import ShapeState from '../ShapeState';
import { ImageOptions } from '../../../settings';

type Props = {
  unit: UnitValue;
  shape: Field;
  fontList: FontList;
  imageOptions: ImageOptions;
  onUpdate: UpdateHandler;
}

type PanelType =
  typeof TextPanel
  | typeof CirclePanel
  | typeof EllipsePanel
  | typeof ImagePanel
  | typeof LinePanel
  | typeof RectPanel
  | typeof BarcodePanel;
const panels: Record<StaticShapeType, PanelType> = {
  text: TextPanel,
  circle: CirclePanel,
  ellipse: EllipsePanel,
  image: ImagePanel,
  line: LinePanel,
  rect: RectPanel,
  barcode: BarcodePanel,
};


export default function FieldProperty(props: Props) {
  const { unit, fontList, shape, imageOptions, onUpdate } = props;
  const [fieldName, setFieldName] = useState(shape.name);
  const [shapeType, setShapeType] = useState<StaticShapeType>(shape.shape.type as StaticShapeType);
  const PanelComponent: PanelType = useMemo(() => panels[shapeType] as PanelType, [shapeType]);
  const defaultStyle = useAtomValue(StylesAtom);
  const shapeProperty = useMemo(
    () => serializeShape(shape.shape), [shape.shape]
  );
  const shapeState = new ShapeState(shapeProperty, defaultStyle);

  useEffect(() => {
    setShapeType(shape.shape.type as StaticShapeType);
    setFieldName(shape.name);
  }, [shape.shape.type, shape.name]);

  const doUpdate = useCallback(
    (name: string, type: StaticShapeType, values: ShapeData) => {
      shapeState.setPreviousState(values);
      const updated = createField({
        name,
        shape: {
          type,
          ...values
        }
      } as FieldData);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values: shapeValues, setValues, handleChangeValue } = usePropertyStates<ShapeData>(
    shapeProperty,
    values => doUpdate(fieldName, shapeType, values),
  );

  const changeShapeType = useCallback((shapeType: StaticShapeType) => {
    setShapeType(shapeType);
    const newShapes = shapeState.states(shapeType);
    setValues(newShapes);
    doUpdate(fieldName, shapeType, newShapes);
  }, [doUpdate, fieldName, setValues]);

  const handleChangeName = useCallback(
    (_: string, value: string, update?: boolean) => {
      setFieldName(value);
      if (update) {
        doUpdate(value, shapeType, shapeValues);
      }
    },
    [doUpdate, shapeType, shapeValues]
  );

  const handleChangeType = useCallback(
    (_: string, value: string) => {
      changeShapeType(value as StaticShapeType
      );
    },
    [changeShapeType]
  );

  const handle = useCallback(
    (name: string, value: any, update?: boolean) => {
      handleChangeValue(name, value, update);
    },
    [handleChangeValue]
  );

  return (
    <PropertyBox>
      <FieldNameFields
        fieldName={fieldName}
        shapeType={shapeType}
        onChangeName={handleChangeName}
        onChangeType={handleChangeType}
      />

      {
        PanelComponent && <PanelComponent
          unit={unit}
          values={shapeProperty as any}
          fontList={fontList}
          imageOptions={imageOptions}
          onChangeValue={handle}
        />
      }
    </PropertyBox>
  );
}
