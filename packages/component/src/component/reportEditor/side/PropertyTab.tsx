/**
 * PropertyTab
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditMode } from '../ReportWorkArea';
import PropertyEditor from '@/component/property/PropertyEditor';
import DefaultStyle from '@/component/property/style/DefaultStyle';
import { FontList } from '@/font';
import { ImageOptions } from '@/settings';

type Props = {
  mode: EditMode;
  imageOptions: ImageOptions;
  errorImageUrl: string;
  fontList: FontList
}

export default function PropertyTab({ mode, imageOptions, fontList, errorImageUrl }: Props) {
  return (
    <>
      {
        mode === "edit" && <PropertyEditor
          imageOptions={imageOptions}
          fontList={fontList}
          errorImageUrl={errorImageUrl}
        />
      }
      {
        mode !== "edit" && <DefaultStyle
          mode={mode}
          fontList={fontList}
        />
      }
    </>
  );
}
