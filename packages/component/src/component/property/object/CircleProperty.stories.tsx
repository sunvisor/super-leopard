// noinspection JSUnusedGlobalSymbols

/**
 * CircleProperty Story
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Meta, StoryObj } from '@storybook/react';
import { Circle, UnitType, createCircle } from '@sunvisor/super-leopard-core';
import CircleProperty from "./CircleProperty";
import { fn } from '@storybook/test';

type Story = StoryObj<typeof CircleProperty>

const meta: Meta<typeof CircleProperty> = {
  component: CircleProperty,
  args: {
    onUpdate: fn(),
  },
};

const circle: Circle = createCircle({
  type: 'circle',
  x: 1,
  y: 2,
  diameter: 3,
  fillColor: undefined,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
})


export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: circle,
  }
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    shape: circle,
  }
}

export default meta;
