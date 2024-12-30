// noinspection JSUnusedGlobalSymbols

/**
 * RectProperty Story
 *
 * Created by sunvisor on 2024/02/11.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import RectProperty from "./RectProperty";
import { Meta, StoryObj } from '@storybook/react';
import { createRect, Rect, UnitType } from '@sunvisor/super-leopard-core';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof RectProperty>

const meta: Meta<typeof RectProperty> = {
  component: RectProperty,
  args: {
    onUpdate: fn(),
  }
};


const rect: Rect = createRect({
  type: 'rect',
  x: 1,
  y: 2,
  width: 3,
  height: 4,
  fillColor: undefined,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
});

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: rect,
  }
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    shape: rect,
  }
}

export default meta;
