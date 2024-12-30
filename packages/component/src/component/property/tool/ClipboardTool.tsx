/**
 * ClipboardTool
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PropertyBox from '../object/PropertyBox';
import ClipboardButtons from '../field/ClipboardButtons';
import { useAtomValue } from 'jotai';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import useEventHandler from '../../reportEditor/hooks/useEventHandler';

export default function ClipboardTool() {
  const selection = useAtomValue(SelectionAtom);
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
