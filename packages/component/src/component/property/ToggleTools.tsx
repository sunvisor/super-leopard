/**
 * ToggleTools
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useMemo } from "react";
import { SxProps, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import Caption from './Caption';

export type ToggleToolButton = {
  value: string;
  icon: React.JSX.Element;
  title?: string;
  caption?: string;
  sx?: SxProps;
  disabled?: boolean;
}

type ChangeHandler =
  | {
  exclusive: true;
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string) => void;
} | {
  exclusive?: false;
  value: string[];
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string[]) => void;
}

type Props = {
  orientation?: 'horizontal' | 'vertical';
  buttons: ToggleToolButton[];
  sx?: SxProps;
} & ChangeHandler;

export default function ToggleTools(props: Props) {
  const { value, onChange, exclusive, orientation, buttons, sx } = props;

  const tooltipPlacement = useMemo(() => orientation === 'vertical' ? 'right' : 'bottom', [orientation]);

  return (
    <ToggleButtonGroup
      value={value}
      exclusive={exclusive}
      orientation={orientation || "horizontal"}
      onChange={onChange}
      sx={sx}
    >
      {buttons.map(({ value, icon, title, caption, sx, disabled }) => (
        <Tooltip key={value} title={title} placement={tooltipPlacement}>
          <span>
            <ToggleButton size="small" value={value} aria-label={title} sx={sx} disabled={disabled}>
              {icon}
              {caption && <Caption sx={{ ml: 1 }}>{caption}</Caption>}
            </ToggleButton>
          </span>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
