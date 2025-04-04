// noinspection JSUnusedGlobalSymbols

/**
 * RectPanel Story
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import RectPanel from "./RectPanel";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType, RectData } from '@sunvisor/super-leopard-core';
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
        <Story/>
      </Box>
    ),
  ],
};

const values: RectData = {
  x: 1,
  y: 2,
  width: 3,
  height: 4,
  fillColor: undefined,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
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
