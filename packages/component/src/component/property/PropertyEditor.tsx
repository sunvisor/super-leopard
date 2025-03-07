/**
 * PropertyEditor
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box, } from '@mui/material';
import ShapeProperty from './object/ShapeProperty';
import TransformProperty from './object/TransformProperty';
import ClipboardTool from './tool/ClipboardTool';
import ZOrderTool from './tool/ZOrderTool';
import ObjectAlignTool from './tool/ObjectAlignTool';
import GroupTool from './tool/GroupTool';
import PageProperty from './page/PageProperty';
import { FontList } from '../../font';
import { ImageOptions } from '../../settings';
import usePage from '../../hooks/usePage';
import useScale from '../../hooks/useScale';
import useSelection from '../../hooks/useSelection';


type Props = {
  imageOptions: ImageOptions;
  errorImageUrl: string;
  fontList: FontList;
}

export default function PropertyEditor(props: Props) {
  const { imageOptions, errorImageUrl, fontList } = props;
  const { selection } = useSelection();
  const { scale } = useScale();
  const { page } = usePage();

  return (
    <Box>
      {
        selection.count === 0 && <PageProperty page={page}/>
      }
      {
        selection.count === 1 && <ShapeProperty
          unit={scale.unit}
          shape={selection.get(0)}
          imageOptions={imageOptions}
          errorImageUrl={errorImageUrl}
          fontList={fontList}
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
