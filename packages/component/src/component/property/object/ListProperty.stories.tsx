// noinspection JSUnusedGlobalSymbols

/**
 * ListProperty Story
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ListProperty from "./ListProperty";
import { Meta, StoryObj } from '@storybook/react';
import { createList, DirectionType, UnitType } from '@sunvisor/super-leopard-core';
import { testAssets } from '../../../__test_assets__';
import { fn } from '@storybook/test';

const { fieldTestData } = testAssets

type Story = StoryObj<typeof ListProperty>

const meta: Meta<typeof ListProperty> = {
  component: ListProperty,
  args: {
    onUpdate: fn(),
  }
};

const list = createList({
  type: 'list',
  width: 100,
  height: 100,
  direction: DirectionType.HORIZONTAL,
  rows: 10,
  columns: 2,
  shapes: fieldTestData,
})

export const Normal: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: list
  }
};

export default meta;
