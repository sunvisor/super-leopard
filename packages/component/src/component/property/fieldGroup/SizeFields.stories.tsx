// noinspection JSUnusedGlobalSymbols

/**
 * SizeFields Story
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import SizeFields from "./SizeFields";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof SizeFields>

const meta: Meta<typeof SizeFields> = {
  component: SizeFields,
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
    width: 20,
    height: 40,
    unit: UnitType.MILLIMETER,
  }
};

export const UnitInch: Story = {
  args: {
    width: 20,
    height: 40,
    unit: UnitType.INCH,
  }
}



export default meta;
