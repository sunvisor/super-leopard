// noinspection JSUnusedGlobalSymbols

/**
 * ImagePanel Story
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ImagePanel from "./ImagePanel";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType, ImageData } from '@sunvisor/super-leopard-core';
import { Box } from '@mui/material';
import { testImageOptions } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ImagePanel>

const meta: Meta<typeof ImagePanel> = {
  component: ImagePanel,
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

const imageOptions = testImageOptions;
const values: ImageData = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  src: 'sunvisorlab_icon.png',
};

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    values,
    imageOptions,
  },
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    values,
    imageOptions,
  },
}

export const EmptyImage: Story = {
  args: {
    unit: UnitType.INCH,
    values: {
      ...values,
      src: '',
    },
    imageOptions,
  },
}

export default meta;
