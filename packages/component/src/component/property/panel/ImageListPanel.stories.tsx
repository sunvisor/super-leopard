// noinspection JSUnusedGlobalSymbols

/**
 * ImageListPanel Story
 *
 * Created by sunvisor on 2024/03/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ImageListPanel from "./ImageListPanel";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { testImageListData } from '../../../__test_assets__';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof ImageListPanel>

const meta: Meta<typeof ImageListPanel> = {
  component: ImageListPanel,
  args: {
    onSelect: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 400 }}>
        <Story />
      </Box>
    )
  ]
};

export const Normal: Story = {
  args: {
    baseUrl: "/api/images/",
    imageList: testImageListData,
  }
};

export default meta;
