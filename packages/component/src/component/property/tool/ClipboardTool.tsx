/**
 * ClipboardTool
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PropertyBox from '../object/PropertyBox';
import ClipboardButtons from '../field/ClipboardButtons';
import useReportManipulator from '@/hooks/useReportManipulator';
import useSelection from '@/hooks/useSelection';


export default function ClipboardTool() {
  const { selection } = useSelection();
  const canCopy = selection.count > 0;
  const { copy, cut, paste, canPaste, remove } = useReportManipulator();

  return (
    <PropertyBox>
      <ClipboardButtons
        canCopy={canCopy}
        canPaste={canPaste()}
        onCopy={copy}
        onCut={cut}
        onPaste={paste}
        onRemove={remove}
      />
    </PropertyBox>
  );
}
