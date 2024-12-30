import { Box } from '@mui/material';
import ColorPickerField from '../field/ColorPickerField';
import BorderWidthField from '../field/BorderWidthField';
import { CapValue, JoinValue, StyleValue } from '@sunvisor/super-leopard-core';
import CapButtons from '../field/CapButtons';
import JoinButtons from '../field/JoinButtons';
import { ChangeValueHandler } from '../usePropertyStates';
import BorderStyleField from '../field/BorderStyleField';
import getCaptions from '../../../captions/getCaptions';
import Caption from '../Caption';
import SvCheckboxField from '../field/SvCheckboxField';
import GroupBox from '../fieldGroup/GroupBox';

export type BorderFieldType = boolean|string|number|CapValue|JoinValue|StyleValue;
type Props = {
  useStroke: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: StyleValue;
  borderCap?: CapValue;
  borderJoin?: JoinValue;
  onChangeValue: ChangeValueHandler<BorderFieldType>;
}

/**
 * BorderFields
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
export default function BorderFields(props: Props) {
  const {
    useStroke,
    borderColor,
    borderWidth,
    borderStyle,
    borderCap,
    borderJoin,
    onChangeValue,
  } = props;
  const captions = getCaptions('borderProperty');

  return (
    <>
      <GroupBox>
        <SvCheckboxField
          name="useStroke"
          label={!useStroke ? captions.border : ''}
          value={useStroke}
          onChangeValue={onChangeValue}
        />
        {
          useStroke && <>
            <Box sx={{ flex: 1, mr: 1 }}>
              <BorderWidthField
                label={captions.width}
                name="borderWidth"
                value={(borderWidth ?? 1).toString()}
                onChangeValue={onChangeValue}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <BorderStyleField
                sx={{ width: '100%' }}
                label={captions.style}
                name="borderStyle"
                value={borderStyle ?? 'solid'}
                onChangeValue={onChangeValue}
              />
            </Box>
          </>
        }
      </GroupBox>
      {
        useStroke && <Box sx={{ ml: 6 }}>
          <ColorPickerField
            sx={{ flex: 1 }}
            label={captions.color}
            name="borderColor"
            value={borderColor ?? '#000000'}
            onChangeValue={onChangeValue}
          />
        </Box>
      }
      {
        useStroke &&
        <GroupBox sx={{ ml: 6 }}>
          <GroupBox sx={{ flex: 1 }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Caption>
                {captions.cap}
              </Caption>
            </Box>
            <CapButtons
              name="borderCap"
              value={borderCap ?? 'butt'}
              onChangeValue={onChangeValue}
            />
          </GroupBox>
          <GroupBox sx={{ flex: 1 }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Caption>
                {captions.join}
              </Caption>
            </Box>
            <JoinButtons
              name="borderJoin"
              value={borderJoin ?? 'miter'}
              onChangeValue={onChangeValue}
            />
          </GroupBox>
        </GroupBox>
      }
    </>
  );
}
