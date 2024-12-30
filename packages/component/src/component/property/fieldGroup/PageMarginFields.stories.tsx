// noinspection JSUnusedGlobalSymbols

/**
 * PageMarginFields Story
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PageMarginFields from "./PageMarginFields";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof PageMarginFields>

const meta: Meta<typeof PageMarginFields> = {
  component: PageMarginFields,
  args: {
    onChangeValue: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Story/>
      </Box>
    ),
  ]
};

export const Normal: Story = {
  args: {
    unit: 'mm',
    margin: {
      top: 10,
      left: 20,
    }
  }
};

export default meta;
