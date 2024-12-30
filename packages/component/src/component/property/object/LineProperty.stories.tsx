// noinspection JSUnusedGlobalSymbols

/**
 * LineProperty Story
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import LineProperty from "./LineProperty";
import { Meta, StoryObj } from '@storybook/react';
import { createLine, Line, UnitType } from '@sunvisor/super-leopard-core';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof LineProperty>

const meta: Meta<typeof LineProperty> = {
  component: LineProperty,
  args: {
    onUpdate: fn(),
  }
};

const line: Line = createLine({
  type: 'line',
  x1: 1,
  y1: 2,
  x2: 3,
  y2: 4,
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
    shape: line,
  }
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    shape: line,
  }
}

export default meta;
