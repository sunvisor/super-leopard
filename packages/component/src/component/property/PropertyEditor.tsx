/**
 * PropertyEditor
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box, } from '@mui/material';
import { useAtomValue } from 'jotai';
import { SelectionAtom } from '../../atom/SelectionAtom';
import ShapeProperty from './object/ShapeProperty';
import { ReadPageAtom, ReadScaleAtom } from '../../atom/ReportAtom';
import TransformProperty from './object/TransformProperty';
import ClipboardTool from './tool/ClipboardTool';
import ZOrderTool from './tool/ZOrderTool';
import ObjectAlignTool from './tool/ObjectAlignTool';
import GroupTool from './tool/GroupTool';
import PageProperty from './page/PageProperty';
import { FontList } from '../../font';

type Props = {
  apiBaseUrl: string;
  fontList: FontList;
}

export default function PropertyEditor(props: Props) {
  const selection = useAtomValue(SelectionAtom);
  const scale = useAtomValue(ReadScaleAtom);
  const page = useAtomValue(ReadPageAtom);

  return (
    <Box>
      {
        selection.count === 0 && <PageProperty page={page}/>
      }
      {
        selection.count === 1 && <ShapeProperty
          unit={scale.unit}
          shape={selection.get(0)}
          apiBaseUrl={props.apiBaseUrl}
          fontList={props.fontList}
        />
      }
      {
        selection.count > 1 && <TransformProperty
          unit={scale.unit}
        />
      }
      {
        selection.count === 1 && <ZOrderTool/>
      }
      {
        selection.count > 1 && <ObjectAlignTool/>
      }
      <ClipboardTool/>
      {
        selection.count > 0 && <GroupTool/>
      }
    </Box>
  );
}
