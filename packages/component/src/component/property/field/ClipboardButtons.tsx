/**
 * ClipboardButtons
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Button, ButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import translation from '../../../translations/translation';
import GroupBox from '../fieldGroup/GroupBox';

type Props = {
  canCopy: boolean;
  canPaste: boolean;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onRemove: () => void;
}

export default function ClipboardButtons(props: Props) {
  const { canCopy, canPaste, onCopy, onCut, onPaste, onRemove } = props;
  const t = translation().operation;

  return (
    <GroupBox sx={{ gap: 1 }}>
      <ButtonGroup variant="outlined">
        <Button size="small" disabled={!canCopy} startIcon={<ContentCutIcon/>} onClick={onCut}>
          {t.cut}
        </Button>
        <Button size="small" disabled={!canCopy} startIcon={<ContentCopyIcon/>} onClick={onCopy}>
          {t.copy}
        </Button>
        <Button size="small" disabled={!canPaste} startIcon={<ContentPasteIcon/>} onClick={onPaste}>
          {t.paste}
        </Button>
      </ButtonGroup>
      <Button
        size="small"
        variant="outlined"
        disabled={!canCopy}
        onClick={onRemove}
        startIcon={<DeleteIcon/>}
      >
        {t.delete}
      </Button>
    </GroupBox>
  );
}
