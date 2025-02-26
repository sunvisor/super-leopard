/**
 * TextColorFields
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box } from '@mui/material';
import FillColorField from '../field/FillColorField';
import { ChangeValueHandler } from '../usePropertyStates';
import ColorPickerField from '../field/ColorPickerField';
import getCaptions from '../../../captions/getCaptions';
import GroupBox from '../fieldGroup/GroupBox';

export type TextColorFieldType = boolean | string | undefined;

type Props = {
  fillColor?: string;
  color: string;
  onChangeValue: ChangeValueHandler<TextColorFieldType>;
}

export default function TextColorFields(props: Props) {
  const {
    fillColor,
    color,
    onChangeValue,
  } = props;
  const captions = getCaptions().textProperty;

  return (
    <GroupBox sx={{ gap: 2 }}>
      <Box sx={{ flex: 0.8 }}>
        <ColorPickerField
          name="color"
          value={color}
          label={captions.color}
          onChangeValue={onChangeValue}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <FillColorField
          fillColor={fillColor}
          onChangeValue={onChangeValue}
        />
      </Box>
    </GroupBox>
  );
}
