// noinspection JSUnusedGlobalSymbols

/**
 * CirclePanel Story
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import CirclePanel from "./CirclePanel";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType, CirclePropertyValue } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof CirclePanel>

const meta: Meta<typeof CirclePanel> = {
  component: CirclePanel,
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

const values: CirclePropertyValue = {
  x: 1,
  y: 2,
  diameter: 3,
  useFillColor: false,
  fillColor: undefined,
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
