/**
 * Caption
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SxProps, Typography } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function Caption(props: Props) {
  const { sx, children } = props;
  return (
    <Typography variant="body2" color="textSecondary" sx={sx}>
      {children}
    </Typography>
  );
}
