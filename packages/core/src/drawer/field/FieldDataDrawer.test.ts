/**
 * Test for FieldDataDrawer
 *
 * Created by sunvisor on 2025/01/27.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createField } from '../../creator';
import { FieldDataDrawer } from './FieldDataDrawer';
import { FieldDrawerParams, StaticShapeDrawerInterface } from '../types';
import { barcodeFieldData, rectFieldData, textFieldData } from '../../__test_assets__/drawerTest';

describe('FieldDataDrawer', () => {
  const mockShapeDrawer: StaticShapeDrawerInterface = {
    draw: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw an error if values are not provided', () => {
    // Arrange
    const fieldDataDrawer = new FieldDataDrawer(mockShapeDrawer);
    const field = createField(textFieldData);
    // Act & Assert
    expect(() =>
      fieldDataDrawer.draw(field, { values: null, opacity: 1 })
    ).toThrowError('values is required');
  });

  it('should draw text shape when field shape is text', () => {
    // Arrange
    const fieldDataDrawer = new FieldDataDrawer(mockShapeDrawer);
    const field = createField(textFieldData);
    const mockValue = 'mockValue';
    const opacity = 0.8;
    const mockParams: FieldDrawerParams = { values: { myField: mockValue }, opacity };
    // Act
    fieldDataDrawer.draw(field, mockParams);
    // Assert
    expect(mockShapeDrawer.draw).toHaveBeenCalledWith(
      expect.objectContaining({ text: mockValue }),
      { opacity }
    );
  });

  it('should draw barcode shape when field shape is barcode', () => {
    // Arrange
    const fieldDataDrawer = new FieldDataDrawer(mockShapeDrawer);
    const field = createField(barcodeFieldData);
    const mockValue = 'https://www.sunvisor.net';
    const opacity = 0.8;
    const mockParams: FieldDrawerParams = { values: { myField: mockValue }, opacity };
    // Act
    fieldDataDrawer.draw(field, mockParams);
    // Assert
    expect(mockShapeDrawer.draw).toHaveBeenCalledWith(
      expect.objectContaining({ value: mockValue }),
      { opacity }
    )
  })

  it('should draw shape when field shape is not text', () => {
    // Arrange
    const fieldDataDrawer = new FieldDataDrawer(mockShapeDrawer);
    const field = createField(rectFieldData);
    const mockValue = true;
    const opacity = 0.5;
    const mockParams: FieldDrawerParams = { values: { myField: mockValue }, opacity };
    // Act
    fieldDataDrawer.draw(field, mockParams);
    // Assert
    expect(mockShapeDrawer.draw).toHaveBeenCalledWith(field.shape, { opacity });
  });

  it('should not draw shape when field shape is not text and value is falsy', () => {
    // Arrange
    const fieldDataDrawer = new FieldDataDrawer(mockShapeDrawer);
    const field = createField(rectFieldData);
    const mockValue = false;
    const opacity = 0.5;
    const mockParams: FieldDrawerParams = { values: { myField: mockValue }, opacity };
    // Act
    fieldDataDrawer.draw(field, mockParams);
    // Assert
    expect(mockShapeDrawer.draw).not.toHaveBeenCalled();
  });
});
