/**
 * ZOrderButtons
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import BringFrontIcon from './icon/BringFrontIcon';
import BringForwardIcon from './icon/BringForwardIcon';
import SendBackwardIcon from './icon/SendBackwardIcon';
import SendBackIcon from './icon/SendBackIcon';
import translation from '@/translations/translation';


export type ZOrderCommand = 'bringToFront' | 'bringToForward' | 'sendToBackward' | 'sendToBack';

type Props = {
  onBringTo: (command: ZOrderCommand) => void;
}

export default function ZOrderButtons(props: Props) {
  const { onBringTo } = props;
  const t = translation().objectManipulation;
  return (
    <ButtonGroup variant="outlined">
      <Tooltip title={t.bringToFront}>
        <Button
          size="small"
          onClick={() => onBringTo('bringToFront')}
          startIcon={<BringFrontIcon/>}
        >
          {t.toFront}
        </Button>
      </Tooltip>
      <Tooltip title={t.bringToForward}>
        <Button
          size="small"
          onClick={() => onBringTo('bringToForward')}
          startIcon={<BringForwardIcon/>}
        >
          {t.toForward}
        </Button>
      </Tooltip>
      <Tooltip title={t.sendToBackward}>
        <Button
          size="small"
          onClick={() => onBringTo('sendToBackward')}
          startIcon={<SendBackwardIcon/>}
        >
          {t.toBackward}
        </Button>
      </Tooltip>
      <Tooltip title={t.sendToBack}>
        <Button
          size="small"
          onClick={() => onBringTo('sendToBack')}
          startIcon={<SendBackIcon/>}
        >
          {t.toBack}
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}
