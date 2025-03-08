/**
 * PageProperty
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect, useState } from "react";
import { changeUnit, createPage, Page, serializePage, UnitValue, PageMargin } from '@sunvisor/super-leopard-core';
import PageUnitField from '../field/PageUnitField';
import PaperSizeFields, { PaperSizeFieldType } from '../fieldGroup/PaperSizeFields';
import GroupBox from '../fieldGroup/GroupBox';
import PageMarginFields from '../fieldGroup/PageMarginFields';
import translation from '../../../translations/translation';
import PropertyBox from '../object/PropertyBox';
import Caption from '../Caption';
import useReport from '../../../hooks/useReport';


type Props = {
  page: Page;
}

export default function PageProperty(props: Props) {
  const t = translation().pageProperty;
  const [page, setPage] = useState<Page>(props.page);
  const [unit, setUnit] = React.useState<UnitValue>(page.unit);
  const { report, setReport } = useReport();

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  const doUpdate = useCallback((page: Page) => {
    const pageData = serializePage(page);
    const newReport = { ...report, page: pageData };
    setReport(newReport);
  }, [report, setReport]);

  const handleSubmit = useCallback(() => {
    doUpdate(page);
  }, [doUpdate, page]);

  const handleUpdate = useCallback((name: string, value: PaperSizeFieldType | PageMargin, update?: boolean) => {
    const pageData = serializePage(page);
    const updated = { ...pageData, [name]: value };
    const newPage = createPage(updated);
    setPage(newPage);
    if (update) doUpdate(newPage);
  }, [doUpdate, page])

  const handleChangeUnit = useCallback((_: string, value: UnitValue) => {
    if (value === unit) return;
    setUnit(value);
    const newPage = page.set('unit', value);
    setPage(newPage);
    const pageData = serializePage(newPage);
    const newReport = { ...report, page: pageData };
    setReport(changeUnit(newReport, unit, value))
  }, [page, report, setReport, unit, setUnit]);

  const handleChange = useCallback((name: string, value: PaperSizeFieldType | PageMargin, update?: boolean) => {
    handleUpdate(name, value, update);
  }, [handleUpdate])

  return (
    <PropertyBox
      onSubmit={handleSubmit}
    >
      <Caption>{t.title}</Caption>
      <GroupBox sx={{ gap: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <PageUnitField
          sx={{ flex: 1 }}
          label={t.unit}
          name="unit"
          value={unit}
          onChangeValue={handleChangeUnit}
        />
      </GroupBox>
      <PaperSizeFields
        page={page}
        onChangeValue={handleChange}
      />
      <PageMarginFields
        margin={page.margin ?? { top: 0, left: 0 }}
        unit={unit}
        onChangeValue={handleChange}
      />
    </PropertyBox>
  );
}
