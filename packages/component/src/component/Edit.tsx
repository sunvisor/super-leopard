/**
 * Edit client side
 *
 * Created by sunvisor on 2024/03/06.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Provider } from 'jotai/index';
import { ReportData } from '@sunvisor/super-leopard-core';
import ReportEditor, { OnSaveHandler } from './reportEditor/ReportEditor';
import { GetSvgImagePath } from '../svg';
import { FontList, WebFontMap } from '../font';


type Props = {
  id: ReportId;
  title: string;
  report?: ReportData;
  onSave: OnSaveHandler;
  webFontMap: WebFontMap;
  getImageUrl: GetSvgImagePath;
  apiBaseUrl: string;
  language?: string;
  fontList: FontList;
}
export type ReportId = number | 'new';

export function Edit(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, report, ...rest } = props;
  return (
    <Provider>
      <ReportEditor
        reportId={props.id}
        data={props.report}
        {...rest}
      />
    </Provider>
  );
}
