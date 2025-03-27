// noinspection JSUnusedGlobalSymbols

/**
 * Barcode Story
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import BarcodeField from "./BarcodeField";
import { Meta, StoryObj } from '@storybook/react';
import { sampleBarcodeValues } from '@sunvisor/super-leopard-core';
import { fieldDecorator } from '@/__test_assets__';
import { defaultSettings } from '@/settings';


type Story = StoryObj<typeof BarcodeField>

const meta: Meta<typeof BarcodeField> = {
  component: BarcodeField,
  decorators: [fieldDecorator],
};

export const Code128: Story = {
  args: {
    format: 'code128',
    value: sampleBarcodeValues.code128,
    rotate: 'N',
    includeText: true,
    errorImageUrl: defaultSettings.barcode.errorImageUrl
  }
};

export const Err: Story = {
  args: {
    format: 'code39',
    value: 'code39',
    rotate: 'N',
    includeText: true,
    errorImageUrl: defaultSettings.barcode.errorImageUrl
  }
}

export default meta;
