// noinspection JSUnusedGlobalSymbols

/**
 * GroupFields Story
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import GroupFields from "./GroupFields";
import { Meta, StoryObj } from '@storybook/react';
import { DirectionType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof GroupFields>

const meta: Meta<typeof GroupFields> = {
  component: GroupFields,
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
    direction: DirectionType.HORIZONTAL,
    repeatCount: 10,
  }
};

export default meta;
