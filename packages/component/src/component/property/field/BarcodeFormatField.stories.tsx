// noinspection JSUnusedGlobalSymbols

/**
 * BarcodeFormatField Story
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import BarcodeFormatField from "./BarcodeFormatField";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { fieldDecorator } from '@/__test_assets__';


type Story = StoryObj<typeof BarcodeFormatField>

const meta: Meta<typeof BarcodeFormatField> = {
  component: BarcodeFormatField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Code128: Story = {
  args: {
    label: 'Format',
    name: 'format',
    value: 'code128'
  }
};

export default meta;
