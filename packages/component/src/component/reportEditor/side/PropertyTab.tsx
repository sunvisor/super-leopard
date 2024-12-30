/**
 * PropertyTab
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditMode } from '../ReportWorkArea';
import PropertyEditor from '../../property/PropertyEditor';
import DefaultStyle from '../../property/style/DefaultStyle';
import { FontList } from '../../../font';

type Props = {
  mode: EditMode;
  apiBaseUrl: string;
  fontList: FontList
}

export default function PropertyTab({ mode, apiBaseUrl, fontList }: Props) {
  return (
    <>
      {

        mode === "edit" && <PropertyEditor
          apiBaseUrl={apiBaseUrl}
          fontList={fontList}
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
