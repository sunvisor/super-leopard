// noinspection JSUnusedGlobalSymbols

/**
 * BarcodeOptionFields Story
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import BarcodeOptionFields from "./BarcodeOptionFields";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from '@mui/material';
import getCaptions from '../../../captions/getCaptions';

type Story = StoryObj<typeof BarcodeOptionFields>

const meta: Meta<typeof BarcodeOptionFields> = {
  component: BarcodeOptionFields,
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    values: {
      rotate: 'N',
      includeText: false,
    },
    captions: getCaptions('barcodeProperty')
  }
};

export default meta;
