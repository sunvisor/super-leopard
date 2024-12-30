/**
 * DefaultStyle
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditMode } from '../../reportEditor/ReportWorkArea';
import { Box } from '@mui/material';
import FillColor from '../style/FillColor';
import Border from '../style/Border';
import Font from '../style/Font';
import PropertyBox from '../object/PropertyBox';
import { FieldShape, LineShape, TextShape } from '@sunvisor/super-leopard-core';
import { FontList } from '../../../font';

type Props = {
  mode: EditMode;
  fontList: FontList;
}

export default function DefaultStyle(props: Props) {
  const { mode, fontList } = props;
  const isText = mode === TextShape || mode === FieldShape;
  const hasFillColor = mode !== LineShape && !isText;
  return (
    <Box>
      {
        hasFillColor && <PropertyBox>
          <FillColor/>
        </PropertyBox>
      }
      {
        !isText && <PropertyBox>
          <Border/>
        </PropertyBox>

      }
      {
        isText && <PropertyBox>
          <Font
            fontList={fontList}
          />
        </PropertyBox>
      }
    </Box>
  )

}
