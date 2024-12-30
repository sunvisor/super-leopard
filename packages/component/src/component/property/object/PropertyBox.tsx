/**
 * PropertyBox
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React from "react";
import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
  onSubmit?: () => void;
}

export default function PropertyBox(props: Props) {
  const { children, onSubmit } = props;

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        if (onSubmit) onSubmit();
        e.preventDefault();
      }}
      sx={{
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        m: 2,
      }}>
      {children}
      <Box sx={{ display: 'none' }}>
        <input type="submit" value="Submit"/>
      </Box>
    </Box>
  );
}
