// noinspection JSUnusedGlobalSymbols

/**
 * AppendShapeRubberBand Story
 *
 * Created by sunvisor on 2024/01/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  AppendShapeRubberBand,
  AppendShapeType,
  OnAppendHandler
} from "./AppendShapeRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { fn, within } from '@storybook/test';
import {
  CircleShape,
  EllipseShape,
  FieldShape,
  ImageShape,
  LineShape,
  RectShape,
  TextShape,
  createScale,
  UnitType,
} from '@sunvisor/super-leopard-core';
import { defaultSettings } from '@/settings';
import { defaultStyle } from '../style';
import { createTestSvgDrawer } from '@/__test_assets__';

export type AppendShapeRubberBandProps = {
  type: AppendShapeType;
  onAppend?: OnAppendHandler
}

type Story = StoryObj<AppendShapeRubberBandProps>

const meta: Meta<AppendShapeRubberBandProps> = {
  title: 'svg/rubberBand/AppendShapeRubberBandProps',
  args: {
    onAppend: fn()
  }
};

const Template: Story = {

  render: () => {
    return (
      <div data-testid="test">
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    draw(canvasElement, args);
  }
};

function draw(canvasElement: HTMLElement, args: AppendShapeRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const scale = createScale({ unit: UnitType.MILLIMETER });
  const styles = defaultStyle;
  const settings = defaultSettings;
  const onAppend = args.onAppend;
  const drawer = new AppendShapeRubberBand(
    {
      svg, scale, type: args.type,
      styles, settings, onAppend,
    }
  );
  el.addEventListener('mousedown', (e) => {
    drawer.start(e.clientX, e.clientY);
  });

  return el;
}


export const Rect: Story = {
  ...Template,
  args: {
    type: RectShape,
  }
}

export const Circle: Story = {
  ...Template,
  args: {
    type: CircleShape,
  }
}

export const Ellipse: Story = {
  ...Template,
  args: {
    type: EllipseShape,
  }
}

export const Line: Story = {
  ...Template,
  args: {
    type: LineShape,
  }
}

export const Text: Story = {
  ...Template,
  args: {
    type: TextShape,
  }
}

export const Field: Story = {
  ...Template,
  args: {
    type: FieldShape,
  }
}

export const Image: Story = {
  ...Template,
  args: {
    type: ImageShape,
  }
}

export default meta;
