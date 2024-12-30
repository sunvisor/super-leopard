// noinspection JSUnusedGlobalSymbols

/**
 * PaperSizeFields Story
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PaperSizeFields from "./PaperSizeFields";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { createPage } from '@sunvisor/super-leopard-core';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof PaperSizeFields>

const meta: Meta<typeof PaperSizeFields> = {
  component: PaperSizeFields,
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

export const A4: Story = {
  args: {
    page: createPage({
      size: 'A4',
      unit: 'mm',
      orientation: 'portrait',
    }),
  },
};

export const Custom: Story = {
  args: {
    page: createPage({
      size: {
        width: 200,
        height: 200,
      },
      unit: 'mm',
      orientation: 'portrait',
    }),
  }
}

export default meta;
