// noinspection JSUnusedGlobalSymbols

/**
 * BorderFields Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import BorderFields from "./BorderFields";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof BorderFields>

const meta: Meta<typeof BorderFields> = {
  component: BorderFields,
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

export const Active: Story = {
  args: {
    border: {
      color: "#000000",
      width: 1,
      style: "solid",
      cap: "round",
      join: "round",
    }
  }
};

export const Inactive: Story = {
  args: {
    border: undefined
  }
}

export default meta;
