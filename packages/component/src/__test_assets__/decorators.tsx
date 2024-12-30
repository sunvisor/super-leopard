/**
 * Storybook Decorators
 *
 * Created by sunvisor on 2024/04/05.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box } from '@mui/material';
import { StoryFn } from '@storybook/react';

export const fieldDecorator = (Story: StoryFn) => (
  <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
    <Story />
  </Box>
);

export const iconDecorator = (Story: StoryFn) => (
  <Box sx={{ width: 50, display: 'flex', flexDirection: 'column', gap: 2, m: 2, opacity: 0.54 }}>
    <Story />
  </Box>
)
