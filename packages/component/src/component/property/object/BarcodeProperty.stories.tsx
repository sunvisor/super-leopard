/**
 * BarcodeProperty Story
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import BarcodeProperty from "./BarcodeProperty";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { createBarcode } from '@sunvisor/super-leopard-core';


type Story = StoryObj<typeof BarcodeProperty>

const meta: Meta<typeof BarcodeProperty> = {
  component: BarcodeProperty,
  args: {
    onUpdate: fn(),
  }
};

const barcode = createBarcode({
  type: 'barcode',
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  format: 'code128',
  value: '1234567890',
  options: {
    rotate: 'N',
    includeText: true
  }
});

export const Normal: Story = {
  args: {
    unit: 'mm',
    shape: barcode,
    errorImageUrl: '/api/images/barcode_error.svg'
  }
};

export default meta;
