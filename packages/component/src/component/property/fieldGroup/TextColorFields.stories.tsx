// noinspection JSUnusedGlobalSymbols

/**
 * TextColorFields Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import TextColorFields from "./TextColorFields";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof TextColorFields>

const meta: Meta<typeof TextColorFields> = {
  component: TextColorFields,
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

export const WithoutFillColor: Story = {
  args: {
    color: '#000000',
    fillColor: undefined,
  }
};

export const WithFillColor: Story = {
  args: {
    color: '#000000',
    fillColor: '#ffffff',
  }
}

export default meta;
