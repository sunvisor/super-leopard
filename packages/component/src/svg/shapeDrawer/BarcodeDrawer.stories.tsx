// noinspection JSUnusedGlobalSymbols

/**
 * BarcodeDrawer Story
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeDrawer } from "./BarcodeDrawer";
import { Meta, StoryObj } from '@storybook/react';
import { BarcodeData, createBarcode, createScale, UnitType } from '@sunvisor/super-leopard-core';
import { expect, within } from '@storybook/test';
import { createTestSvgDrawer } from '../../__test_assets__';
import { BarcodeOptions } from '../../settings';

type BarcodeProps = {
  barcode: BarcodeData;
  opacity?: number;
}

type Story = StoryObj<BarcodeProps>

const meta: Meta<BarcodeProps> = {
  title: 'svg/BarcodeDrawer',
};

const barcodeOptions: BarcodeOptions = {
  errorImageUrl : 'api/images/barcode_error.svg',
}

const Template: Story = {
  render: () => (
    <div data-testid="test">
    </div>
  ),

  play: async ({ canvasElement, args }) => {
    // Arrange
    const el = draw(canvasElement, args);
    // Assert
    await expect(el.querySelector('image')).toBeInTheDocument();
  }
}


function draw(canvasElement: HTMLElement, args: BarcodeProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const barcode = createBarcode(args.barcode);
  const drawer = new BarcodeDrawer({ svg, scale, barcodeOptions });
  drawer.draw(barcode, { opacity: args.opacity ?? 1 });
  return el;
}

const baseConfig: Omit<BarcodeData, 'value' | 'format'> = {
  type: 'barcode',
  x: 10,
  y: 10,
  width: 100,
  height: 40,
  options: {
    includeText: true
  }
}

export const Code128: Story = {
  ...Template,
  args: {
    barcode: {
      ...baseConfig,
      format: 'code128',
      value: '12345678901234567890'
    }
  }
};

export const Code39: Story = {
  ...Template,
  args: {
    barcode: {
      ...baseConfig,
      format: 'code39',
      value: '1234567'
    }
  }
};

export const QR: Story = {
  ...Template,
  args: {
    barcode: {
      ...baseConfig,
      format: 'qr',
      value: 'https://www.sunvisor.net'
    }
  }
};

export const Err: Story = {
  ...Template,
  args: {
    barcode: {
      ...baseConfig,
      format: 'code39',
      value: 'sunvisorlab'
    },
    opacity: 0
  }
};

export default meta;
