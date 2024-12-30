// noinspection JSUnusedGlobalSymbols

/**
 * MultiLineFields Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import MultiLineFields from "./MultiLineFields";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof MultiLineFields>

const meta: Meta<typeof MultiLineFields> = {
  component: MultiLineFields,
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

export const Active: Story = {
  args: {
    multiLine: true,
    linePitch: 7,
    unit: UnitType.MILLIMETER,
  }
};

export const Inactive: Story = {
  args: {
    multiLine: false,
  }
}

export default meta;
