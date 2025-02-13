// noinspection JSUnusedGlobalSymbols

/**
 * ImageDrawer Story
 *
 * Created by sunvisor on 2023/12/16.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import {
  createImage,
  createRect,
  createScale,
  ImageData,
  ImageShape,
  RectData,
  RectShape,
  UnitType,
} from "@sunvisor/super-leopard-core";
import { expect, within } from "@storybook/test";
import { RectDrawer } from './RectDrawer';
import ImageDrawer from './ImageDrawer';
import { createTestSvgDrawer } from '../../__test_assets__';

type ImageProps = {
  image: ImageData;
  opacity: number;
}

type Story = StoryObj<ImageProps>

const meta: Meta<ImageProps> = {
  title: 'svg/ImageDrawer',
};

const Template: Story = {
  render: () => (
    <div data-testid="test">
    </div>
  ),

  play: async ({ canvasElement, args }) => {
    // Arrange
    const el = draw(canvasElement, args);
    // Assert
    await expect(el.querySelector('image')).toBeInTheDocument();
  }
}

function getImagePath(src: string) {
  return `api/images/${src}`;
}

function draw(canvasElement: HTMLElement, args: ImageProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const config: ImageData = args.image;
  const rectConfig: RectData = {
    type: RectShape,
    x: config.x,
    y: config.y,
    width: config.width,
    height: config.height,
    border: {
      width: 0.5,
      color: '#000'
    }
  }
  const image = createImage(config);
  const rect = createRect(rectConfig);
  const rectDrawer = new RectDrawer({ svg, scale });
  const imageDrawer = new ImageDrawer({ svg, scale, getImagePath });
  rectDrawer.draw(rect, {});
  imageDrawer.draw(image, { opacity: args.opacity ?? 1 });
  return el;
}

export const Default: Story = {
  ...Template,
  args: {
    image: {
      type: ImageShape,
      x: 10,
      y: 10,
      src: 'sunvisorlab_icon.png',
      width: 40,
      height: 40,
    }
  }
}
export const Wide: Story = {
  ...Template,
  args: {
    image: {
      type: ImageShape,
      x: 10,
      y: 10,
      src: 'sunvisorlab_icon.png',
      width: 60,
      height: 40,
    }
  }
}

export const Tall: Story = {
  ...Template,
  args: {
    image: {
      type: ImageShape,
      x: 10,
      y: 10,
      src: 'sunvisorlab_icon.png',
      width: 40,
      height: 60,
    }
  }
}

export const Opacity: Story = {
  ...Template,
  args: {
    image: {
      type: ImageShape,
      x: 10,
      y: 10,
      src: 'sunvisorlab_icon.png',
      width: 40,
      height: 40,
    },
    opacity: 0.5,
  }
}
export default meta;
