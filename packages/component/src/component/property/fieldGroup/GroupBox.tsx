/**
 * GroupBox
 *
 * Created by sunvisor on 2024/02/27.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box, SxProps } from '@mui/material';
import React from 'react';

type Props = {
  sx?: SxProps;
  children?: React.ReactNode;
}
export default function GroupBox(props: Props) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      ...props.sx
    }}>
      {props.children}
    </Box>
  );
}
