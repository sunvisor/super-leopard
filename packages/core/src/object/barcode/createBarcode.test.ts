/**
 * Test for CreateBarcode
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createBarcode } from "./createBarcode";
import { BarcodeData, sampleBarcodeValues } from '../../data';
import { expect } from 'vitest';
import { Barcode } from './Barcode';


describe('Tests for createBarcode', () => {

  it('should create barcode', () => {
    // Arrange
    const data: BarcodeData = {
      type: 'barcode',
      format: 'code128',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      value: 'value'
    };
    // Act
    const barcode = createBarcode(data);
    // Assert
    expect(barcode.x).toBe(data.x);
    expect(barcode.y).toBe(data.y);
    expect(barcode.width).toBe(data.width);
    expect(barcode.height).toBe(data.height);
    expect(barcode.format).toBe(data.format);
    expect(barcode.value).toBe(data.value);
    expect(barcode.type).toBe('barcode');
  });

  it('type is optional', () => {
    // Arrange
    const data: BarcodeData = {
      format: 'code128',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      value: 'value'
    };
    // Act
    const barcode = createBarcode(data);
    // Assert
    expect(barcode.type).toBe('barcode');
    expect(barcode).toBeInstanceOf(Barcode);
  });

  it('should set sample value when value is not specified', () => {
    // Arrange
    const data: BarcodeData = {
      format: 'code128',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    };
    // Act
    const barcode = createBarcode(data);
    // Assert
    expect(barcode.value).toBe(sampleBarcodeValues.code128);
  });

  it('should throw error when type is not barcode', () => {
    // Arrange
    const data: BarcodeData = {
      // @ts-expect-error Invalid type
      type: 'text',
      format: 'code128',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      value: 'value'
    };
    // Act
    // Assert
    expect(() => createBarcode(data)).toThrow('Invalid shape type: text');
  });

});
