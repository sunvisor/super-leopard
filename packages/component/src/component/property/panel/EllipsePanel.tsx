/**
 * EllipsePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionFields from '../fieldGroup/PositionFields';
import SizeFields from '../fieldGroup/SizeFields';
import FillColorField from '../field/FillColorField';
import BorderFields from '../fieldGroup/BorderFields';
import { UnitValue, EllipseData, BorderData } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';

export type EllipsePanelValueType = number | string | BorderData | undefined;
type Props = {
  unit: UnitValue,
  values: EllipseData;
  onChangeValue: ChangeValueHandler<EllipsePanelValueType>;
}
export default function EllipsePanel(props: Props) {
  const { unit, values, onChangeValue } = props;

  return (
    <>
      <PositionFields
        x={values.x}
        y={values.y}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <SizeFields
        width={values.width}
        height={values.height}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <FillColorField
        fillColor={values.fillColor}
        onChangeValue={onChangeValue}
      />
      <BorderFields
        border={values.border}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
