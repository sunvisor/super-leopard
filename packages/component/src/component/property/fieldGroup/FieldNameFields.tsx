/**
 * FieldNameFields
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ShapeTypeField from '../field/ShapeTypeField';
import { ShapeType } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import getCaptions from '../../../captions/getCaptions';
import SvTextField from '../field/SvTextField';
import GroupBox from '../fieldGroup/GroupBox';

export type FieldNameFieldType = ShapeType|string;
type Props = {
  fieldName: string;
  shapeType: ShapeType;
  onChangeName: ChangeValueHandler<string>;
  onChangeType: ChangeValueHandler<FieldNameFieldType>;
}

export default function FieldNameFields(props: Props) {
  const { fieldName, shapeType } = props;
  const captions = getCaptions('fieldProperty');

  return (
    <GroupBox sx={{ gap: 2 }}>
      <SvTextField
        size="small"
        sx={{ flex: 2}}
        name="fieldName"
        label={captions.name}
        value={fieldName}
        onChangeValue={props.onChangeName}
      />
      <ShapeTypeField
        label={captions.shapeType}
        name="shapeType"
        value={shapeType}
        onChangeValue={props.onChangeType}
        sx={{ flex: 1}}
      />
    </GroupBox>
  );
}
