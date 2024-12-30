// noinspection JSUnusedGlobalSymbols

/**
 * RectPanel Story
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import RectPanel from "./RectPanel";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType, RectPropertyValue  } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof RectPanel>

const meta: Meta<typeof RectPanel> = {
  component: RectPanel,
  args: {
    onChangeValue: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

const values: RectPropertyValue = {
  x: 1,
  y: 2,
  width: 3,
  height: 4,
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
