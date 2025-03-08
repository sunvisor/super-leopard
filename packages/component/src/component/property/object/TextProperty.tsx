/**
 * TextProperty
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import { createText, serializeText, Text, TextData, UnitValue } from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import { FontList } from '../../../font';
import { Box } from '@mui/material';
import translation from '../../../translations/translation';
import TextPanel from '../panel/TextPanel';
import SvTextField from '../field/SvTextField';
import { UpdateHandler } from './ShapeProperty';
import PropertyBox from './PropertyBox';


type Props = {
  unit: UnitValue;
  shape: Text;
  fontList: FontList;
  onUpdate: UpdateHandler;
}

export default function TextProperty(props: Props) {
  const { unit, shape, fontList, onUpdate } = props;
  const textValue = useMemo(
    () => serializeText(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: TextData) => {
      const updated = createText(values);
      onUpdate(shape, updated);
    },
    [onUpdate, shape]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<TextData>(
    textValue,
    values => doUpdate(values)
  );
  const t = translation().textProperty;

  useEffect(() => {
    setValues(textValue);
  }, [setValues, textValue]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <Box>
        <SvTextField
          name="text"
          size="small"
          fullWidth
          label={t.text}
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
