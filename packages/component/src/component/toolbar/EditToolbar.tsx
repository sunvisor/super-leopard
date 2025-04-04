/**
 * EditToolbar
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { ReactNode, useEffect } from 'react';
import { Box, Divider, IconButton, Input, Toolbar, Tooltip } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import translation from '@/translations/translation';

type Props = {
  title: string;
  onSave: (event: React.MouseEvent<HTMLElement>) => void;
  onPropertyOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onChangeTitle: (title: string) => void;
  showSaveButton?: boolean;
  additionalTools?: {
    before?: ReactNode;
    after?: ReactNode;
  }
}

export default function EditToolbar(props: Props) {
  const [title, setTitle] = React.useState<string>(props.title);
  const showSaveButton = props.showSaveButton !== undefined ? props.showSaveButton : true;
  const t = translation().editTool;
  const [editTitle, setEditTitle] = React.useState<boolean>(false);

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

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
    <Toolbar variant="dense" sx={{ px: 1 }} disableGutters>
      {
        props.additionalTools?.before && props.additionalTools.before
      }
      {
        showSaveButton && <Tooltip title={t.save}>
          <IconButton size="small" color="inherit" onClick={props.onSave} aria-label={t.save}>
            <SaveIcon/>
          </IconButton>
        </Tooltip>
      }
      {
        props.additionalTools?.after && props.additionalTools.after
      }
      {
        (showSaveButton || props.additionalTools) && <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2 }}/>
      }
      <Tooltip title={t.rename}>
        <IconButton size="small" color="inherit" onClick={handleEdit} aria-label={t.rename}>
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        {editTitle
          ? <Input
            inputRef={input => input && input.focus()}
            sx={{ width: '100%', color: 'inherit' }}
            type="text"
            value={title}
            onChange={handleChangeTitle}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
          /> :
          <span onClick={() => setEditTitle(true)} color="inherit" style={{ userSelect: 'none' }}>{title}</span>
        }
      </Box>
      <Tooltip title={t.property}>
        <IconButton size="small" color="inherit" onClick={props.onPropertyOpen} aria-label={t.property}>
          <ListAltIcon/>
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
