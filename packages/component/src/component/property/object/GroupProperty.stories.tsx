// noinspection JSUnusedGlobalSymbols

/**
 * GroupProperty Story
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import GroupProperty from "./GroupProperty";
import { Meta, StoryObj } from '@storybook/react';
import { createGroup, UnitType } from '@sunvisor/super-leopard-core';
import { fn } from '@storybook/test';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


type Story = StoryObj<typeof GroupProperty>

const meta: Meta<typeof GroupProperty> = {
  component: GroupProperty,
  args: {
    onUpdate: fn(),
  }
};

const group = createGroup({
  type: 'group',
  width: 100,
  height: 100,
  repeatCount: 1,
  direction: 'horizontal',
  shapes: shapeTestData,
})

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: group,
  }
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    shape: group,
  }
}

export default meta;
