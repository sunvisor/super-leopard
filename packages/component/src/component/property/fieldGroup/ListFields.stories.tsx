// noinspection JSUnusedGlobalSymbols

/**
 * ListFields Story
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ListFields from "./ListFields";
import { Meta, StoryObj } from '@storybook/react';
import { DirectionType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof ListFields>

const meta: Meta<typeof ListFields> = {
  component: ListFields,
  args: {
    onChangeValue: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Story />
      </Box>
    ),
  ]
};

export const Normal: Story = {
  args: {
    rows: 10,
    columns: 2,
    direction: DirectionType.HORIZONTAL,
  }
};

export default meta;
