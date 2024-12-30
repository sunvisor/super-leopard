// noinspection JSUnusedGlobalSymbols

/**
 * EllipseProperty Story
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Meta, StoryObj } from '@storybook/react';
import { Ellipse, UnitType, createEllipse } from '@sunvisor/super-leopard-core';
import EllipseProperty from "./EllipseProperty";
import { fn } from '@storybook/test';


type Story = StoryObj<typeof EllipseProperty>

const meta: Meta<typeof EllipseProperty> = {
  component: EllipseProperty,
  args: {
    onUpdate: fn(),
  }
};

const ellipse: Ellipse = createEllipse({
  type: 'ellipse',
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
})

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: ellipse,
  }
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    shape: ellipse,
  }
}

export default meta;
