/**
 * ObjectAlignButtons
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import { Box, Button, ButtonGroup, Tooltip } from '@mui/material';
import translation from '@/translations/translation';
import DistributeHorizontallyIcon from './icon/DistributeHorizontallyIcon';
import DistributeVerticallyIcon from './icon/DistributeVerticallyIcon';
import React from 'react';

type AlignButtonProps = {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
}

function AlignButton(props: AlignButtonProps) {
  return (
    <Tooltip title={props.title}>
      <Button size="small" aria-label={props.title} onClick={props.onClick}>
        {props.children}
      </Button>
    </Tooltip>
  )
}

export type ObjectAlignCommand = 'left' | 'center' | 'right' |
  'top' | 'middle' | 'bottom' |
  'distributeHorizontally' | 'distributeVertically';

type Props = {
  onClick: (command: ObjectAlignCommand) => void;
}

export default function ObjectsAlignButtons(props: Props) {
  const { onClick } = props;
  const t = translation().objectManipulation;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
      <ButtonGroup variant="outlined">
        <AlignButton title={t.alignToLeft} onClick={() => onClick('left')}>
          <AlignHorizontalLeftIcon/>
        </AlignButton>
        <AlignButton title={t.alignToCenter} onClick={() => onClick('center')}>
          <AlignHorizontalCenterIcon/>
        </AlignButton>
        <AlignButton title={t.alignToCenter} onClick={() => onClick('right')}>
          <AlignHorizontalRightIcon/>
        </AlignButton>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <AlignButton title={t.alignToTop} onClick={() => onClick('top')}>
          <AlignVerticalTopIcon/>
        </AlignButton>
        <AlignButton title={t.alignToMiddle} onClick={() => onClick('middle')}>
          <AlignVerticalCenterIcon/>
        </AlignButton>
        <AlignButton title={t.alignToBottom} onClick={() => onClick('bottom')}>
          <AlignVerticalBottomIcon/>
        </AlignButton>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <AlignButton title={t.distributeHorizontally} onClick={() => onClick('distributeHorizontally')}>
          <DistributeHorizontallyIcon/>
        </AlignButton>
        <AlignButton title={t.distributeVertically} onClick={() => onClick('distributeVertically')}>
          <DistributeVerticallyIcon/>
        </AlignButton>
      </ButtonGroup>
    </Box>
  );
}
