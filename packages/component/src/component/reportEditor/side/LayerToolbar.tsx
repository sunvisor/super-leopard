/**
 * LayerToolbar
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Button, Toolbar } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCallback } from "react";
import getCaptions from '../../../captions/getCaptions';

type Props = {
  onAddLayer: () => void;
}

export default function LayerToolbar({ onAddLayer }: Props) {
  const captions = getCaptions('layerOperation');

  const handleClick = useCallback(() => {
    onAddLayer();
  }, [onAddLayer]);

  return (
    <Toolbar>
      <Button
        startIcon={<AddCircleIcon/>}
        onClick={handleClick}
      >
        {captions.addLayer}
      </Button>
    </Toolbar>
  );
}
