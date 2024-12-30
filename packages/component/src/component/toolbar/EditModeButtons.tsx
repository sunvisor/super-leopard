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
import { EditMode } from '../reportEditor/ReportWorkArea';
import EllipseIcon from '../toolbar/EllipseIcon';
import LineIcon from '../toolbar/LineIcon';
import getCaptions from '../../captions/getCaptions';
import ToggleTools, { ToggleToolButton } from '../property/ToggleTools';

type OnChangeHandler = (event: React.MouseEvent<HTMLElement>, newMode: EditMode) => void;

type Props = {
  mode?: EditMode;
  onChange: OnChangeHandler;
  orientation?: 'vertical' | 'horizontal';
}
export type EditModeButtonsProps = Props;
export default function EditModeButtons(props: Props) {
  const { onChange, orientation } = props;
  const [mode, setMode] = React.useState<EditMode>(props.mode || "edit");
  const captions = getCaptions('editModeTool');

  const handleChange = useCallback((event: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      const newMode = value as EditMode;
      setMode(newMode);
      onChange(event, newMode);
    }
  }, [onChange, setMode]);

  const buttons: ToggleToolButton[] = useMemo(() => [
    { value: "edit", icon: <HighlightAltIcon />, title: captions.edit },
    { value: "rect", icon: <RectangleOutlinedIcon />, title: captions.rect },
    { value: "circle", icon: <CircleOutlinedIcon />, title: captions.circle },
    { value: "ellipse", icon: <EllipseIcon />, title: captions.ellipse },
    { value: "line", icon: <LineIcon />, title: captions.line },
    { value: "image", icon: <PhotoSizeSelectActualIcon /> , title: captions.image },
    { value: "text", icon: <TitleIcon /> , title: captions.text },
    { value: "field", icon: <TextFieldsIcon /> , title: captions.field },
  ], [captions.edit, captions.rect, captions.circle, captions.ellipse, captions.line, captions.image, captions.text, captions.field]);

  return (
    <ToggleTools
      value={mode}
      exclusive
      orientation={orientation || "horizontal"}
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
