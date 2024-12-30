// noinspection JSUnusedGlobalSymbols

/**
 * PositionPairFields Story
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionPairFields from "./PositionPairFields";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof PositionPairFields>

const meta: Meta<typeof PositionPairFields> = {
  component: PositionPairFields,
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

export const UnitMillimeter: Story = {
  args: {
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
    unit: UnitType.MILLIMETER,
  }
};

export const UnitInch: Story = {
  args: {
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
    unit: UnitType.INCH,
  }
}

export default meta;
