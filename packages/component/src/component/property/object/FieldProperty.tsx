/**
 * FieldProperty
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { contractField, expandShape, Field, ShapePropertyValue, StaticShapeType, UnitValue } from '@sunvisor/super-leopard-core';
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
import ShapeState from '../ShapeState';
import { useAtomValue } from 'jotai';
import { FontStyleAtom } from '../../../atom/StylesAtom';
import { UpdateHandler } from './ShapeProperty';

type Props = {
  unit: UnitValue;
  shape: Field;
  fontList: FontList;
  apiBaseUrl: string;
  onUpdate: UpdateHandler;
}

type PanelType = typeof TextPanel | typeof CirclePanel | typeof EllipsePanel | typeof ImagePanel | typeof LinePanel | typeof RectPanel;
const panels: Record<StaticShapeType, PanelType> = {
  text: TextPanel,
  circle: CirclePanel,
  ellipse: EllipsePanel,
  image: ImagePanel,
  line: LinePanel,
  rect: RectPanel
};

export default function FieldProperty(props: Props) {
  const { unit, fontList, shape, apiBaseUrl, onUpdate } = props;
  const [fieldName, setFieldName] = useState(shape.name);
  const [shapeType, setShapeType] = useState<StaticShapeType>(shape.shape.type as StaticShapeType);
  const PanelComponent: PanelType = useMemo(() => panels[shapeType] as PanelType, [shapeType]);
  const defaultFont = useAtomValue(FontStyleAtom);
  const shapeProperty = useMemo(
    () => expandShape(shape.shape), [shape.shape]
  );

  useEffect(() => {
    setShapeType(shape.shape.type as StaticShapeType);
    setFieldName(shape.name);
  }, [shape.shape.type, shape.name]);

  const doUpdate = useCallback(
    (name: string, type: StaticShapeType, values: ShapePropertyValue) => {
      const updated = contractField(name, type, values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );
  const { values: shapeValues, setValues, handleChangeValue } = usePropertyStates<ShapePropertyValue>(
    shapeProperty,
    values => doUpdate(fieldName, shapeType, values),
  );

  const changeShapeType = useCallback((value: StaticShapeType) => {
    setShapeType(value);
    const states = new ShapeState(shapeValues, defaultFont);
    setValues(states.states(value));
    doUpdate(fieldName, value, shapeValues);
  }, [defaultFont, doUpdate, fieldName, setValues, shapeValues]);

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

  useEffect(() => {
    setValues(shapeProperty);
  }, [setValues, shapeProperty]);

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
          values={shapeValues as any}
          fontList={fontList}
          apiBaseUrl={apiBaseUrl}
          onChangeValue={handleChangeValue as any}
        />
      }
    </PropertyBox>
  );
}
