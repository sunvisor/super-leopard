/**
 * ImageListPanel
 *
 * Created by sunvisor on 2024/03/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useState } from "react";
import {
  Box, Button, IconButton, ImageList, ImageListItem,
  ImageListItemBar, Toolbar, Tooltip,
} from "@mui/material";
import Caption from '../Caption';
import getCaptions from '../../../captions/getCaptions';
import CloseIcon from '@mui/icons-material/Close';
import { ImageListData } from '../../index';

type Props = {
  imageList: ImageListData[];
  baseUrl: string;
  onSelect: (image: ImageListData | undefined) => void;
}

export default function ImageListPanel(props: Props) {
  const { imageList, baseUrl, onSelect } = props;
  const [selected, setSelected] = useState<ImageListData | undefined>();
  const captions = getCaptions('imageProperty');

  const handleClick = useCallback(
    (image: ImageListData) => {
      setSelected(selected?.name === image.name ? undefined : image);
    },
    [selected?.name]
  );

  const handleButtonClick = useCallback(
    () => {
      if (selected) {
        onSelect(selected);
      }
    }, [onSelect, selected]
  )

  const onIconButtonClick = useCallback(() => {
    setSelected(undefined);
    onSelect(undefined)
  }, [onSelect]);

  return (
    <Box sx={{ width: 400, height: "100%", display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Toolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Caption>{captions.selectMessage}</Caption>
          </Box>
          <Tooltip title={captions.close}>
            <IconButton onClick={onIconButtonClick}>
              <CloseIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <ImageList
          cols={3}
          rowHeight={120}
          sx={{
            height: "100%",
            marginBlockStart: 0,
            marginBlockEnd: 0,
          }}
        >
          {
            imageList.map(image => {
              const name = image.name;

              const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
                if (e.button === 0) {
                  handleClick(image)
                }
              }

              return (
                <ImageListItem
                  key={name}
                  onClick={handleItemClick}
                  sx={{
                    ':hover': {
                      border: '1px solid #0cc'
                    },
                    ':active': {
                      opacity: '50%'
                    },
                    border: selected?.name === name ? "1px solid #c00" : "1px solid #cccccc00",
                  }}
                >
                  <Box
                    component="img"
                    src={`${baseUrl}/${image.name}`}
                    alt={image.name}
                    sx={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <ImageListItemBar
                    subtitle={image.name}
                  />
                </ImageListItem>
              );
            })
          }
        </ImageList>
      </Box>
      <Toolbar variant="dense" disableGutters>
        <Caption sx={{ flexGrow: 1 }}>{selected ? selected.name : captions.selectMessage}</Caption>
        <Button variant="contained" disabled={!selected} onClick={handleButtonClick}>{captions.decide}</Button>
      </Toolbar>
    </Box>
  );
}
