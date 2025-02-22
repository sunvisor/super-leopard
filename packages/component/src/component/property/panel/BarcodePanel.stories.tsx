/**
 * BarcodePanel Story
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import BarcodePanel from "./BarcodePanel";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof BarcodePanel>

const meta: Meta<typeof BarcodePanel> = {
  component: BarcodePanel,
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
    values: {
      x: 10,
      y: 20,
      width: 100,
      height: 50,
      format: 'code128',
    },
    unit: 'mm'
  }
};

export default meta;
