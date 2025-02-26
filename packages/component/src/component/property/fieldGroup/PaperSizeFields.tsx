/**
 * PaperSizeFields
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useState } from "react";
import GroupBox from '../fieldGroup/GroupBox';
import PaperSizeField from '../field/PaperSizeField';
import { Page, OrientationValue, PageSize, PaperSize, PaperSizeValue } from '@sunvisor/super-leopard-core';
import NumberField from '../field/NumberField';
import { MAX_SCALE_VALUE } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import getCaptions from '../../../captions/getCaptions';
import OrientationField from '../field/OrientationField';


type PaperSize = PaperSizeValue | 'custom';
export type PaperSizeFieldType = PageSize|OrientationValue;

function expandPaperSize(value: Page): {
  paperSize: PaperSize;
  width: number;
  height: number;
} {
  if (typeof value.size === 'string') {
    return {
      paperSize: value.size,
      width: value.width,
      height: value.height,
    };
  }
  return {
    paperSize: 'custom',
    width: value.size.width,
    height: value.size.height,
  };
}

function contractPaperSize(paperSize: PaperSize, width: number, height: number): PageSize {
  if (paperSize === 'custom') {
    return {
      width,
      height,
    };
  }
  return paperSize;
}

type Props = {
  page: Page;
  onChangeValue: ChangeValueHandler<PaperSizeFieldType>;
}

export default function PaperSizeFields(props: Props) {
  const { page, onChangeValue } = props;
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const enableSizeField = paperSize === 'custom';

  useEffect(() => {
    const { paperSize, width, height } = expandPaperSize(page);
    setPaperSize(paperSize);
    setWidth(width);
    setHeight(height);
  }, [page]);
  const captions = getCaptions().pageProperty;

  const handleChangePaperSize = useCallback(
    (_: string, value: PaperSizeValue | 'custom') => {
      setPaperSize(value);
      if (value !== 'custom') {
        const { width, height } = page.set('size', value);
        setWidth(width);
        setHeight(height);
      }
      const newPageSize = contractPaperSize(value, width, height);
      onChangeValue('size', newPageSize, true);
    }, [height, onChangeValue, page, width]
  );

  const handleChangeOrientation = useCallback((_: string, value: OrientationValue) => {
    onChangeValue('orientation', value, true);
  }, [onChangeValue]);

  const handleChangeWidth = useCallback((_: string, value: number, update?: boolean) => {
    setWidth(value);
    const newPageSize = contractPaperSize(paperSize, value, height);
    onChangeValue('size', newPageSize, update);
  }, [height, onChangeValue, paperSize])

  const handleChangeHeight = useCallback((_: string, value: number, update?: boolean) => {
    setHeight(value);
    const newPageSize = contractPaperSize(paperSize, width, value);
    onChangeValue('size', newPageSize, update);
  }, [onChangeValue, paperSize, width])

  return (
    <>
      <GroupBox sx={{ gap: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <PaperSizeField
          sx={{ flex: 1 }}
          label={captions.paperSize}
          name="paperSize"
          value={paperSize}
          onChangeValue={handleChangePaperSize}
        />
        <OrientationField
          sx={{ flex: 1 }}
          name="orientation"
          value={page.orientation}
          onChangeValue={handleChangeOrientation}
        />
      </GroupBox>
      <GroupBox sx={{ gap: 2 }}>
        <NumberField
          label={captions.width}
          name="width"
          unit={page.unit}
          value={width}
          disabled={!enableSizeField}
          minValue={0}
          maxValue={MAX_SCALE_VALUE}
          onChangeValue={handleChangeWidth}
        />
        <NumberField
          label={captions.height}
          name="height"
          unit={page.unit}
          value={height}
          disabled={!enableSizeField}
          minValue={0}
          maxValue={MAX_SCALE_VALUE}
          onChangeValue={handleChangeHeight}
        />
      </GroupBox>
    </>
  );
}
