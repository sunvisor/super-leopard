// noinspection JSUnusedGlobalSymbols

/**
 * TransformProperty Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import TransformProperty from "./TransformProperty";
import { Meta, StoryObj } from '@storybook/react';
import { UnitType } from '@sunvisor/super-leopard-core';

type Story = StoryObj<typeof TransformProperty>

const meta: Meta<typeof TransformProperty> = {
  component: TransformProperty,
};

export const Normal: Story = {
  args: {
    unit: UnitType.MILLIMETER,
  }
};

export default meta;
