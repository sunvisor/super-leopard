// noinspection JSUnusedGlobalSymbols

/**
 * OrientationField Story
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import OrientationField from "./OrientationField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof OrientationField>

const meta: Meta<typeof OrientationField> = {
  component: OrientationField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  },
};

export const Portrait: Story = {
  args: {
    value: "portrait",
  }
};

export const Landscape: Story = {
  args: {
    value: "landscape",
  }
}

export default meta;
