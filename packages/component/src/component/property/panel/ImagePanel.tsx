/**
 * ImagePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useState } from "react";
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
}

export default function ImagePanel(props: Props) {
  const { imageOptions, unit, values, onChangeValue } = props;
  const { getImageList, getImageUrl, noImageUrl }  = imageOptions;
  const t = translation().imageProperty;
  const [openSelect, setOpenSelect] = useState(false);
  const [imageList, setImageList] = useState<ImageListData[]>([]);
  const srcUrl = values.src.length ? getImageUrl(values.src) : noImageUrl;

  useEffect(() => {
    const fetchImageList = async () => {
      const imageList = await getImageList();
      setImageList(imageList);
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchImageList();
  }, []);

  const handleOpenSelect = useCallback(
    async () => {
      setOpenSelect(true);
    },
    []
  );

  const handleImageListPanelSelect = useCallback((image?: ImageListData) => {
    if (image) {
      onChangeValue('src', image.name, true);
    }
    setOpenSelect(false);
  }, [onChangeValue, setOpenSelect]);

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
              startIcon={<CollectionsIcon/>}
            >
              {t.select}
            </Button>
          </Box>
          <Box sx={{ height: 200 }}>
            <SvImage
              src={srcUrl}
              alt={srcUrl}
            />
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
