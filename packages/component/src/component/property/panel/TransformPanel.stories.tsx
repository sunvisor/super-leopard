// noinspection JSUnusedGlobalSymbols

/**
 * TransformPanel Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import TransformPanel from "./TransformPanel";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType } from '@sunvisor/super-leopard-core';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof TransformPanel>

const meta: Meta<typeof TransformPanel> = {
  component: TransformPanel,
  args: {
    onUpdate: fn(),
  },
};

export const Normal: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    box: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    }
  }
};

export default meta;
