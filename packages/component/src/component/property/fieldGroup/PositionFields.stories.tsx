// noinspection JSUnusedGlobalSymbols

/**
 * PositionFields Story
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionFields from "./PositionFields";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof PositionFields>

const meta: Meta<typeof PositionFields> = {
  component: PositionFields,
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
    x: 10,
    y: 20,
    unit: UnitType.MILLIMETER,
  }
};

export const UnitInch: Story = {
  args: {
    x: 10,
    y: 20,
    unit: UnitType.INCH
  }
}

export default meta;
