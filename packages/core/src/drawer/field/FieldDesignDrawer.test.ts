/**
 * Test for FieldDesignDrawer
 *
 * Created by sunvisor on 2025/01/28.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { FieldDesignDrawer } from "./FieldDesignDrawer";
import { createField } from '../../creator';
import { Barcode, Rect, Text } from '../../object';
import { expect } from 'vitest';
import { barcodeFieldData, rectFieldData, textFieldData } from '../../__test_assets__/drawerTest';
import { sampleBarcodeValues } from '../../data';

describe('Tests for FieldDesignDrawer', () => {

  const mockShapeDrawer = {
    draw: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should draw bounding box with specified color', () => {
    // Arrange
    const borderColor = '#8888ff';
    const field = createField(textFieldData);
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[1];
    expect((result[0] as Rect).border.color.color).toBe(borderColor);
  });

  it('should draw text with field name when field shape is text', () => {
    // Arrange
    const borderColor = '#8888ff';
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    const field = createField(textFieldData);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[0];
    expect((result[0] as Text).text).toBe(field.name);
  });

  it('should draw barcode when field shape is barcode', () => {
    // Arrange
    const borderColor = '#8888ff';
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    const field = createField(barcodeFieldData);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[0];
    const format = barcodeFieldData.shape.format;
    expect((result[0] as Barcode).value).toBe(sampleBarcodeValues[format]);
  });

  it('should draw shape when field shape is not text', () => {
    // Arrange
    const borderColor = '#8888ff';
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    const field = createField(rectFieldData);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[0];
    expect((result[0] as Rect).equals(field.shape)).toBe(true);
  });

});
