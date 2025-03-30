/**
 * EditModeButtons
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo } from "react";
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { EditMode } from '../reportEditor/ReportWorkArea';
import EllipseIcon from '../toolbar/EllipseIcon';
import LineIcon from '../toolbar/LineIcon';
import translation from '@/translations/translation';
import ToggleTools, { ToggleToolButton } from '../property/ToggleTools';

type OnChangeHandler = (event: React.MouseEvent<HTMLElement>, newMode: EditMode) => void;

type Props = {
  mode: EditMode;
  onChange: OnChangeHandler;
  orientation?: 'vertical' | 'horizontal';
}
export type EditModeButtonsProps = Props;
export default function EditModeButtons(props: Props) {
  const { onChange, orientation } = props;
  const t = translation().editModeTool;

  const handleChange = useCallback((event: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      const newMode = value as EditMode;
      onChange(event, newMode);
    }
  }, [onChange]);

  const buttons: ToggleToolButton[] = useMemo(() => [
    { value: "edit", icon: <HighlightAltIcon />, title: t.edit },
    { value: "rect", icon: <RectangleOutlinedIcon />, title: t.rect },
    { value: "circle", icon: <CircleOutlinedIcon />, title: t.circle },
    { value: "ellipse", icon: <EllipseIcon />, title: t.ellipse },
    { value: "line", icon: <LineIcon />, title: t.line },
    { value: "image", icon: <PhotoSizeSelectActualIcon /> , title: t.image },
    { value: "text", icon: <TitleIcon /> , title: t.text },
    { value: "field", icon: <TextFieldsIcon /> , title: t.field },
    { value: "barcode", icon: <QrCodeIcon /> , title: t.barcode },
  ], [t.edit, t.rect, t.circle, t.ellipse, t.line, t.image, t.text, t.field, t.barcode]);

  return (
    <ToggleTools
      value={props.mode}
      exclusive
      orientation={orientation || "horizontal"}
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
