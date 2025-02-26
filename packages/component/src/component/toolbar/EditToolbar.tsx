/**
 * EditToolbar
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React from 'react';
import { Box, Divider, IconButton, Input, Toolbar, Tooltip } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import getCaptions from '../../captions/getCaptions';

type Props = {
  title: string;
  onSave: (event: React.MouseEvent<HTMLElement>) => void;
  onPropertyOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onChangeTitle: (title: string) => void;
}

export default function EditToolbar(props: Props) {
  const [title, setTitle] = React.useState<string>(props.title);
  const captions = getCaptions().editTool;
  const [editTitle, setEditTitle] = React.useState<boolean>(false);


  const handleEdit = () => {
    setEditTitle(true);
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onChangeTitle(event.target.value);
    setEditTitle(false);
  }

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onChangeTitle(title);
      setEditTitle(false);
    }
    if (event.key === 'Escape') {
      setTitle(props.title);
      setEditTitle(false);
    }
  }

  return (
    <Toolbar variant="dense">
      <Tooltip title={captions.save}>
        <IconButton size="small" color="inherit" onClick={props.onSave} aria-label={captions.save}>
          <SaveIcon/>
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2 }}/>
      <Tooltip title={captions.rename}>
        <IconButton size="small" color="inherit" onClick={handleEdit} aria-label={captions.rename}>
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        {editTitle
          ? <Input
            inputRef={input => input && input.focus()}
            sx={{ width: '100%' }}
            type="text"
            value={title}
            onChange={handleChangeTitle}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            inputProps={{
              style: { color: 'white' }
            }}
          /> :
          <span onClick={() => setEditTitle(true)} style={{ color: 'white' }}>{title}</span>
        }
      </Box>
      <Tooltip title={captions.property}>
        <IconButton size="small" color="inherit" onClick={props.onPropertyOpen} aria-label={captions.property}>
          <ListAltIcon/>
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
