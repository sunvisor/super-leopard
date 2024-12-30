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
import UploadButton from '../field/UploadButton';
import { ImagePropertyValue, UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import getCaptions from '../../../captions/getCaptions';
import SvImage from '../field/SvImage';
import CollectionsIcon from '@mui/icons-material/Collections';
import { ImageListData } from '../../index';
import ImageListPanel from '../panel/ImageListPanel';

export type ImagePanelValueType = string | number;
type Props = {
  apiBaseUrl: string;
  unit: UnitValue;
  values: ImagePropertyValue;
  onChangeValue: ChangeValueHandler<ImagePanelValueType>;
}

async function doUpload(apiBaseUrl: string ,file: File) {
  const data = new FormData()
  data.set('file', file);
  const res = await fetch(apiBaseUrl, {
    method: 'POST',
    body: data
  });
  const result = await res.json();
  return result.image;
}

export default function ImagePanel(props: Props) {
  const { apiBaseUrl,unit, values, onChangeValue } = props;
  const captions = getCaptions('imageProperty');
  const [openSelect, setOpenSelect] = useState(false);
  const [imageList, setImageList] = useState<ImageListData[]>([]);
  const srcUrl = `${apiBaseUrl}/${values.src}`;

  useEffect(() => {
    const fetchImageList = async () => {
      const res = await fetch(apiBaseUrl);
      const imageList = await res.json();
      setImageList(imageList);
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchImageList();
  }, [apiBaseUrl]);

  const handleChangeFile = useCallback(
    async (_: string, file: File) => {
      const newSrc = await doUpload(apiBaseUrl, file);
      onChangeValue('src', newSrc, true);
    },
    [onChangeValue, apiBaseUrl]
  );

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
              {captions.select}
            </Button>
            <UploadButton
              name="upload"
              label={captions.upload}
              onChangeFile={handleChangeFile}
            />
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
          baseUrl={apiBaseUrl}
          imageList={imageList}
          onSelect={handleImageListPanelSelect}
        />
      }
    </>
  );
}
