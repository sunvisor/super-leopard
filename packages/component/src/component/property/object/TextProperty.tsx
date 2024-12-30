/**
 * TextProperty
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import {
  Text, UnitValue,
  expandText, TextPropertyValue, contractText
} from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import { FontList } from '../../../font';
import { Box } from '@mui/material';
import getCaptions from '../../../captions/getCaptions';
import TextPanel from '../panel/TextPanel';
import SvTextField from '../field/SvTextField';
import { UpdateHandler } from './ShapeProperty';
import PropertyBox from './PropertyBox';
import { adjustFontStyle } from '../../../font/font';


type Props = {
  unit: UnitValue;
  shape: Text;
  fontList: FontList;
  onUpdate: UpdateHandler;
}

export default function TextProperty(props: Props) {
  const { unit, shape, fontList, onUpdate } = props;
  const textProperty = useMemo(
    () => expandText(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: TextPropertyValue) => {
      const newValues = {
        ...values,
        fontStyle: adjustFontStyle({
          family: values.fontFamily,
          style: values.fontStyle,
          multiLine: values.multiLine,
          fontList,
        }),
      };
      const updated = contractText(newValues);
      onUpdate(shape, updated);
    },
    [fontList, onUpdate, shape]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<TextPropertyValue>(
    textProperty,
    values => doUpdate(values)
  );
  const captions = getCaptions('textProperty');

  useEffect(() => {
    const { multiLine, fontFamily: family, fontStyle: style } = textProperty;
    const fontStyle = adjustFontStyle({
      family,
      style,
      multiLine,
      fontList,
    });
    setValues({ ...textProperty, fontStyle });
  }, [fontList, setValues, textProperty]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <Box>
        <SvTextField
          name="text"
          size="small"
          fullWidth
          label={captions.text}
          value={values.text}
          multiline={values.multiLine}
          maxRows={5}
          onChangeValue={handleChangeValue}/>
      </Box>
      <TextPanel
        unit={unit}
        values={values}
        fontList={fontList}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
