// noinspection JSUnusedGlobalSymbols

/**
 * FillColorField Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FillColorField from "./FillColorField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof FillColorField>

const meta: Meta<typeof FillColorField> = {
  component: FillColorField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Active: Story = {
  args: {
    fillColor: "#ffffff",
  }
};

export const Inactive: Story = {
  args: {
    fillColor: undefined
  }
}

export default meta;
