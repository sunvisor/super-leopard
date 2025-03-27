// noinspection JSUnusedGlobalSymbols

/**
 * ColorPicker Story
 *
 * Created by sunvisor on 2024/02/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ColorPickerField from "./ColorPickerField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ColorPickerField>

const meta: Meta<typeof ColorPickerField> = {
  component: ColorPickerField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    sx: { width : 400 },
    label: 'Fill Color',
    value: '#349853'
  }
};

export default meta;
