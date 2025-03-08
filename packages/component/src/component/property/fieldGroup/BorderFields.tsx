import { Box } from '@mui/material';
import ColorPickerField from '../field/ColorPickerField';
import BorderWidthField from '../field/BorderWidthField';
import { BorderData, CapValue, JoinValue, StyleValue } from '@sunvisor/super-leopard-core';
import CapButtons from '../field/CapButtons';
import JoinButtons from '../field/JoinButtons';
import { ChangeValueHandler } from '../usePropertyStates';
import BorderStyleField from '../field/BorderStyleField';
import translation from '../../../translations/translation';
import Caption from '../Caption';
import SvCheckboxField from '../field/SvCheckboxField';
import GroupBox from '../fieldGroup/GroupBox';
import { useCallback, useState } from 'react';

export type BorderFieldType = string|number|CapValue|JoinValue|StyleValue;
type Props = {
  border: BorderData | undefined;
  onChangeValue: ChangeValueHandler<BorderData | undefined>;
}

/**
 * BorderFields
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
export default function BorderFields(props: Props) {
  const { onChangeValue } = props;
  const t = translation().borderProperty;
  const [border, setBorder] = useState<BorderData | undefined>(props.border);
  const [useStroke, setUseStroke] = useState(border !== undefined);

  const handleChangeValue = useCallback((key: string, value: BorderFieldType, update?: boolean) => {
    const newBorder = {...border, [key.split('.').pop() || '']: value};
    setBorder(newBorder);
    onChangeValue('border', newBorder, update);
  }, [border, onChangeValue])

  const handleChangeUseStroke = useCallback((_: string, value: boolean) => {
    setUseStroke(value);
    const newBorder: BorderData | undefined = value ? {
      color: '#000000',
      width: 1,
      style: 'solid',
      cap: 'butt',
      join: 'miter'
    } : undefined;
    setBorder(newBorder);
    onChangeValue('border', newBorder, true);
  }, [onChangeValue])

  return (
    <>
      <GroupBox>
        <SvCheckboxField
          name="useStroke"
          label={!useStroke ? t.border : ''}
          value={useStroke}
          onChangeValue={handleChangeUseStroke}
        />
        {
          border && <>
            <Box sx={{ flex: 1, mr: 1 }}>
              <BorderWidthField
                label={t.width}
                name="border.width"
                value={(border.width ?? 1).toString()}
                onChangeValue={handleChangeValue}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <BorderStyleField
                sx={{ width: '100%' }}
                label={t.style}
                name="border.style"
                value={border.style ?? 'solid'}
                onChangeValue={handleChangeValue}
              />
            </Box>
          </>
        }
      </GroupBox>
      {
        border && <Box sx={{ ml: 6 }}>
          <ColorPickerField
            sx={{ flex: 1 }}
            label={t.color}
            name="border.color"
            value={border.color ?? '#000000'}
            onChangeValue={handleChangeValue}
          />
        </Box>
      }
      {
        border &&
        <GroupBox sx={{ ml: 6 }}>
          <GroupBox sx={{ flex: 1 }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Caption>
                {t.cap}
              </Caption>
            </Box>
            <CapButtons
              name="border.cap"
              value={border.cap ?? 'butt'}
              onChangeValue={handleChangeValue}
            />
          </GroupBox>
          <GroupBox sx={{ flex: 1 }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Caption>
                {t.join}
              </Caption>
            </Box>
            <JoinButtons
              name="border.join"
              value={border.join ?? 'miter'}
              onChangeValue={handleChangeValue}
            />
          </GroupBox>
        </GroupBox>
      }
    </>
  );
}
