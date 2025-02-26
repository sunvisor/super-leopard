/**
 * LayerListItem
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useState } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, Input, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import WbIridescentIcon from '@mui/icons-material/WbIridescent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import { LayerItem } from './LayerList';
import getCaptions from '../../../captions/getCaptions';

type Props = {
  item: LayerItem;
  onSelect: (item: LayerItem) => void;
  onRemove: (item: LayerItem) => void;
  onRename: (item: LayerItem, name: string) => void;
}

export default function LayerListItem(props: Props) {
  const { item, onSelect, onRemove, onRename } = props;
  const captions = getCaptions().layerOperation;
  const [editMode, setEditMode] = useState(false);
  const [layerName, setLayerName] = useState(item.name);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  const handleItemClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const handleDeleteClick = useCallback(() => {
    onRemove(item);
  }, [item, onRemove]);

  const handleEditClick = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLayerName(event.target.value);
  }, [])

  const handleBlurName = useCallback(() => {
    setEditMode(false);
    onRename(item, layerName);
  }, [item, layerName, onRename]);

  const handleNameKeydown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEditMode(false);
      onRename(item, layerName);
    }
    if (event.key === 'Escape') {
      setEditMode(false);
      setLayerName(item.name);
    }
  }, [item, layerName, onRename]);

  return (
    <div ref={setNodeRef} style={style}>
      <ListItem disablePadding secondaryAction={
        <>
          <Tooltip title={captions.renameLayer} placement="left">
            <IconButton edge="end" aria-label="delete" onClick={handleEditClick}>
              <EditIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={captions.removeLayer} placement="right">
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon sx={{ml: 1}}/>
          </IconButton>
          </Tooltip>
        </>
      }>
        <ListItemButton onClick={handleItemClick}>
          <div ref={setActivatorNodeRef} style={iconStyle} {...attributes} {...listeners}>
            <ListItemIcon>
              {item.active ? <WbIridescentIcon/> : <DragHandleIcon/>}
            </ListItemIcon>
          </div>
          {
            editMode && <Input
              inputRef={input => input && input.focus()}
              type="text"
              value={layerName}
              onChange={handleChangeName}
              onBlur={handleBlurName}
              onKeyDown={handleNameKeydown}
            />
          }
          {
            !editMode && <ListItemText>
              {item.name}
            </ListItemText>

          }
        </ListItemButton>
      </ListItem>
    </div>
  )
    ;
}
