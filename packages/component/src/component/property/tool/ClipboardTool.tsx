/**
 * ClipboardTool
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PropertyBox from '../object/PropertyBox';
import ClipboardButtons from '../field/ClipboardButtons';
import useEventHandler from '../../reportEditor/hooks/useEventHandler';
import useSelection from '../../../hooks/useSelection';


export default function ClipboardTool() {
  const { selection } = useSelection();
  const canCopy = selection.count > 0;
  const { onCopy, onCut, onPaste, canPaste, onRemove } = useEventHandler();

  return (
    <PropertyBox>
      <ClipboardButtons
        canCopy={canCopy}
        canPaste={canPaste()}
        onCopy={onCopy}
        onCut={onCut}
        onPaste={onPaste}
        onRemove={onRemove}
      />
    </PropertyBox>
  );
}
