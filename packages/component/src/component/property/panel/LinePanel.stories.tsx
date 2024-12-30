// noinspection JSUnusedGlobalSymbols

/**
 * LinePanel Story
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import LinePanel from "./LinePanel";
import { Meta, StoryObj } from '@storybook/react';
import { LinePropertyValue, UnitType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof LinePanel>

const meta: Meta<typeof LinePanel> = {
  component: LinePanel,
  args: {
    onChangeValue: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Story/>
      </Box>
    ),
  ],
};

const values: LinePropertyValue = {
  x1: 1,
  y1: 2,
  x2: 3,
  y2: 4,
  useStroke: true,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#000000',
  borderCap: 'butt',
  borderJoin: 'miter',
}

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    values,
  }
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    values,
  }
}

export default meta;
