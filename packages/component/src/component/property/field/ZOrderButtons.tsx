/**
 * ZOrderButtons
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Button, ButtonGroup } from '@mui/material';
import BringFrontIcon from '../field/icon/BringFrontIcon';
import BringForwardIcon from '../field/icon/BringForwardIcon';
import SendBackwardIcon from '../field/icon/SendBackwardIcon';
import SendBackIcon from '../field/icon/SendBackIcon';
import getCaptions from '../../../captions/getCaptions';

export type ZOrderCommand = 'bringToFront' | 'bringToForward' | 'sendToBackward' | 'sendToBack';

type Props = {
  onBringTo: (command: ZOrderCommand) => void;
}

export default function  ZOrderButtons(props: Props) {
  const { onBringTo } = props;
  const captions = getCaptions('objectManipulation');
  return (
    <ButtonGroup variant="outlined">
      <Button
        size="small"
        onClick={() => onBringTo('bringToFront')}
        startIcon={<BringFrontIcon/>}>{captions.bringToFront}
      </Button>
      <Button
        size="small"
        onClick={() => onBringTo('bringToForward')}
        startIcon={<BringForwardIcon/>}>{captions.bringToForward}
      </Button>
      <Button
        size="small"
        onClick={() => onBringTo('sendToBackward')}
        startIcon={<SendBackwardIcon/>}>{captions.sendToBackward}
      </Button>
      <Button
        size="small"
        onClick={() => onBringTo('sendToBack')}
        startIcon={<SendBackIcon/>}>{captions.sendToBack}
      </Button>
    </ButtonGroup>
  );
}
