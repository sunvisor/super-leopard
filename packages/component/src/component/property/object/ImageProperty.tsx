/**
 * ImageProperty
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import {
  Image,
  ImageData,
  UnitValue,
  serializeImage, createImage
} from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import PropertyBox from './PropertyBox';
import ImagePanel from '../panel/ImagePanel';
import { UpdateHandler } from './ShapeProperty';
import { ImageOptions } from '@/settings';

type Props = {
  imageOptions: ImageOptions;
  unit: UnitValue;
  shape: Image;
  onUpdate: UpdateHandler;
}

export default function ImageProperty(props: Props) {
  const { imageOptions, unit, shape, onUpdate } = props;
  const imageProperty = useMemo(
    () => serializeImage(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: ImageData) => {
      const updated = createImage(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<ImageData>(
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
        imageOptions={imageOptions}
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
