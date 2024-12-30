/**
 * ImageProperty
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import { Image, UnitValue, contractImage, expandImage, ImagePropertyValue } from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import PropertyBox from './PropertyBox';
import ImagePanel from '../panel/ImagePanel';
import { UpdateHandler } from './ShapeProperty';

type Props = {
  apiBaseUrl: string;
  unit: UnitValue;
  shape: Image;
  onUpdate: UpdateHandler;
}

export default function ImageProperty(props: Props) {
  const { apiBaseUrl, unit, shape, onUpdate } = props;
  const imageProperty = useMemo(
    () => expandImage(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: ImagePropertyValue) => {
      const updated = contractImage(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<ImagePropertyValue>(
    imageProperty,
    values => doUpdate(values)
  );

  useEffect(() => {
    setValues(imageProperty);
  }, [imageProperty, setValues]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <ImagePanel
        apiBaseUrl={apiBaseUrl}
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
