// noinspection JSUnusedGlobalSymbols

/**
 * BorderWidthField Story
 *
 * Created by sunvisor on 2024/02/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import BorderWidthField from "./BorderWidthField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof BorderWidthField>

const meta: Meta<typeof BorderWidthField> = {
  component: BorderWidthField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    label: "Border Width",
    value: "1",
  }
};
export default meta;
