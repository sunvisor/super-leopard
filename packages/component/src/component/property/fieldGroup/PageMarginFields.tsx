/**
 * PageMarginFields
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect } from "react";
import GroupBox from '../fieldGroup/GroupBox';
import NumberField from '../field/NumberField';
import { MAX_SCALE_VALUE, PageMargin } from '@sunvisor/super-leopard-core';
import { UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import getCaptions from '../../../captions/getCaptions';

type Props = {
  margin: PageMargin;
  unit: UnitValue;
  onChangeValue: ChangeValueHandler<PageMargin>;
};

export default function PageMarginFields(props: Props) {
  const { unit, onChangeValue } = props;
  const [margin, setMargin] = React.useState<PageMargin>(props.margin);
  const captions = getCaptions('pageProperty');

  useEffect(() => {
    setMargin(props.margin);
  }, [props.margin]);

  const handleChange = useCallback((name: string, value: number, update?: boolean) => {
    const newMargin = { ...margin, [name]: value };
    setMargin(newMargin);
    onChangeValue('margin', newMargin, update);
  }, [margin, onChangeValue, setMargin]);

  return (
    <GroupBox sx={{ gap: 2 }}>
      <NumberField
        label={captions.top}
        name="top"
        unit={unit}
        value={margin.top}
        minValue={-MAX_SCALE_VALUE}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={handleChange}
      />
      <NumberField
        label={captions.left}
        name="left"
        unit={unit}
        value={margin.left}
        minValue={-MAX_SCALE_VALUE}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={handleChange}
      />
    </GroupBox>
  );
}
