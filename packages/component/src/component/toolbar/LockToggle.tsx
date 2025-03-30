/**
 * LockToggle
 *
 * Created by sunvisor on 2025/03/30.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import AutoModeIcon from '@mui/icons-material/AutoMode';
import translation from '@/translations/translation';


type Props = {
  locked: boolean;
  onChange: (locked: boolean) => void;
}

export default function LockToggle({ locked, onChange }: Props) {
  const t = translation().editModeTool;

  return (
    <Tooltip title={locked ? t.unlock : t.lock}>
      <ToggleButton
        value="lock"
        size="small"
        selected={locked}
        onChange={() => onChange(!locked)}
      >
        <AutoModeIcon
          sx = {{
            transform: locked ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </ToggleButton>
    </Tooltip>
  );
}
