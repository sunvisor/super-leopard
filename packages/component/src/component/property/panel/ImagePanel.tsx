/**
 * ImagePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { use, useCallback, useState, Suspense, useMemo } from "react";
import PositionFields from '../fieldGroup/PositionFields';
import SizeFields from '../fieldGroup/SizeFields';
import { Box, Button } from '@mui/material';
import { ImageData, UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import SvImage from '../field/SvImage';
import CollectionsIcon from '@mui/icons-material/Collections';
import ImageListPanel from '../panel/ImageListPanel';
import translation from '@/translations/translation';
import { ImageListData } from '@/component';
import { ImageOptions } from '@/settings';

export type ImagePanelValueType = string | number;
type Props = {
  imageOptions: ImageOptions;
  unit: UnitValue;
  values: ImageData;
  onChangeValue: ChangeValueHandler<ImagePanelValueType>;
};
type InnerProps = {
  promise: Promise<ImageListData[]>
} & Props;

// Suspense 内部で呼び出す用のラッパー
function InnerImagePanel(
  { imageOptions: { getImageUrl, noImageUrl }, unit, values, onChangeValue, promise }: InnerProps
) {
  const t = translation().imageProperty;
  const imageList = use(promise);
  const [openSelect, setOpenSelect] = useState(false);
  const srcUrl = values.src.length ? getImageUrl(values.src) : noImageUrl;

  const handleOpenSelect = useCallback(() => {
    setOpenSelect(true);
  }, []);

  const handleImageListPanelSelect = useCallback((image?: ImageListData) => {
    if (image) {
      onChangeValue('src', image.name, true);
    }
    setOpenSelect(false);
  }, [onChangeValue]);

  return (
    <>
      <PositionFields
        x={values.x}
        y={values.y}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <SizeFields
        width={values.width}
        height={values.height}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      {
        !openSelect && <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleOpenSelect}
              disabled={imageList.length === 0}
              startIcon={<CollectionsIcon />}
            >
              {t.select}
            </Button>
          </Box>
          <Box sx={{ height: 200 }}>
            <SvImage src={srcUrl} alt={srcUrl} />
          </Box>
        </>
      }
      {
        openSelect && <ImageListPanel
          getImageUrl={getImageUrl}
          imageList={imageList}
          onSelect={handleImageListPanelSelect}
        />
      }
    </>
  );
}

// 外から見ると従来と同じシグネチャ
export default function ImagePanel(props: Props) {
  const promise = useMemo(
    () => props.imageOptions.getImageList(),
    [props.imageOptions]
  );

  return (
    <Suspense fallback={<div>Loading images...</div>}>
      <InnerImagePanel promise={promise} {...props} />
    </Suspense>
  );
}
