/**
 * ObjectListItem
 *
 * Created by sunvisor on 2024/03/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ListIcon from '@mui/icons-material/List';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Tooltip, 
  Typography,
} from '@mui/material';
import {
  CircleShape, EllipseShape,
  Field,
  FieldShape,
  Group,
  GroupShape,
  ImageShape,
  LineShape,
  ListShape,
  RectShape,
  Shape,
  Text,
  TextShape,
} from '@sunvisor/super-leopard-core';
import getCaptions from '../../captions/getCaptions';
import EllipseIcon from '../toolbar/EllipseIcon';
import LineIcon from '../toolbar/LineIcon';

type Props = {
  shape: Shape;
  indent: number;
  onClick: (shape: Shape) => void;
  onSettingClick: (shape: Shape) => void;
}

type ObjectListItemProps = {
  title: string;
  icon: React.ReactElement;
  indent: number;
  onItemClick: (e: React.MouseEvent) => void;
  onSettingClick: (e: React.MouseEvent) => void;
}

function ObjectListItemItem({ title, icon, indent, onItemClick, onSettingClick }: ObjectListItemProps) {
  const captions = getCaptions('reportObject');
  return (
    <ListItem dense disablePadding>
      <ListItemButton dense sx={{ pl: indent * 2 }} onClick={onItemClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>
          <Typography noWrap>
            {title}
          </Typography>
        </ListItemText>
      </ListItemButton>
      <IconButton size="small" aria-label={captions.editProperty} onClick={onSettingClick}>
        <Tooltip title={captions.editProperty}>
          <SettingsIcon />
        </Tooltip>
      </IconButton>
    </ListItem>
  )
}

function getIcon(shape: Shape) {
  switch (shape.type) {
    case GroupShape:
      return <CategoryIcon />
    case ListShape:
      return <ListIcon />
    case TextShape:
      return <TitleIcon />
    case FieldShape:
      return <TextFieldsIcon />
    case RectShape:
      return <RectangleOutlinedIcon />
    case CircleShape:
      return <CircleOutlinedIcon />
    case EllipseShape:
      return <EllipseIcon />
    case LineShape:
      return <LineIcon />
    case ImageShape:
      return <PhotoSizeSelectActualIcon />
    default:
      throw new Error(`Unknown shape type: ${shape.type}`);
  }
}

export default function ObjectListItem({ shape, indent, onClick, onSettingClick }: Props) {
  const shapeTypes = getCaptions('shapeType');
  const title = shape.type === TextShape
    ? (shape as Text).text
    : shape.type === FieldShape
      ? (shape as Field).name
      : shapeTypes[shape.type];
  const icon = getIcon(shape)

  const handleItemClick = useCallback(() => {
    onClick(shape);
  }, [onClick, shape])

  const handleSettingClick = useCallback(() => {
    onSettingClick(shape);
  }, [onSettingClick, shape])

  return (
    <>
      <ObjectListItemItem
        icon={icon}
        title={title}
        indent={indent}
        onItemClick={handleItemClick}
        onSettingClick={handleSettingClick}
      />
      {
        (shape.type === GroupShape || shape.type === ListShape) &&
        <List dense disablePadding>
          {
            (shape as Group).shapes.map((item, index) =>
              <ObjectListItem
                key={index}
                shape={item}
                indent={indent + 1}
                onClick={onClick}
                onSettingClick={onSettingClick}
              />
            )
          }
        </List>
      }
    </>
  );
}
