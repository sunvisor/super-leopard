/**
 * Test for BarcodeDrawer
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeDrawer } from "./BarcodeDrawer";
import { createTestSvgDrawer } from '../../__test_assets__';
import { BarcodeData, createBarcode, Scale, UnitType } from '@sunvisor/super-leopard-core';
import { afterEach } from 'vitest';


describe('Tests for BarcodeDrawer', () => {
  const svg = createTestSvgDrawer();
  const scale = new Scale({ unit: UnitType.INCH });
  const errorImageUrl = '/api/images/barcode_error.png';
  const barcodeOptions = { errorImageUrl }
  const drawer = new BarcodeDrawer({ svg, scale, barcodeOptions });
  const base: Omit<BarcodeData, 'value' | 'format'> = {
    type: 'barcode',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }

  afterEach(() => {
    vi.clearAllMocks();
  })

  it('should draw barcode', () => {
    // Arrange
    svg.clear();
    const barcodeData: BarcodeData = {
      format: 'code128',
      value: '12345',
      ...base,
    }
    const barcode = createBarcode(barcodeData);
    // Act
    drawer.draw(barcode, {})
    // Assert
    expect(svg.find('image').length).toBe(1);
    const element = svg.find('image')[0];
    expect(element.attr('x')).toBe(scale.toPixel(0));
    expect(element.attr('y')).toBe(scale.toPixel(0));
    expect(element.attr('width')).toBe(scale.toPixel(100));
    expect(element.attr('height')).toBe(scale.toPixel(100));
    expect(element.attr('href').startsWith('data:image')).toBe(true);
  });

  it('should draw error image when error is occurred', () => {
    // Arrange
    svg.clear();
    const barcodeData: BarcodeData = {
      format: 'code39',
      value: 'sunvisorlab', // must be digits
      ...base,
    }
    const barcode = createBarcode(barcodeData);
    // Act
    drawer.draw(barcode, {})
    // Assert
    const element = svg.find('image')[0];
    expect(element.attr('href')).toBe(errorImageUrl);
  });

});
