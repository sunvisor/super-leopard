// noinspection JSUnusedGlobalSymbols

/**
 * ImageProperty Story
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ImageProperty from "./ImageProperty";
import { Meta, StoryObj } from '@storybook/react';
import { createImage, Image, UnitType } from '@sunvisor/super-leopard-core';
import { NO_IMAGE } from '../../../svg';
import imageHandlers from '../../../__test_assets__/msw/imageHandlers';
import { testImageListData } from '../../../__test_assets__';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof ImageProperty>

const meta: Meta<typeof ImageProperty> = {
  component: ImageProperty,
  args: {
    onUpdate: fn(),
  },
  parameters: {
    msw: {
      handlers: imageHandlers(testImageListData),
    }
  }
};

const image: Image= createImage( {
  type: 'image',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  src: NO_IMAGE,
});

export const UnitMillimeter: Story = {
  args: {
    apiBaseUrl: '/api/images',
    unit: UnitType.MILLIMETER,
    shape: image,
  }
};

export const UnitInch: Story = {
  args: {
    apiBaseUrl: '/api/images',
    unit: UnitType.INCH,
    shape: image,
  }
}

export default meta;
