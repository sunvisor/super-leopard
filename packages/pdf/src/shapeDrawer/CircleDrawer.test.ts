/**
 * Test for CircleDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { CircleDrawer } from "./CircleDrawer";
import { CircleData, createCircle, createScale, StyleType } from '@sunvisor/super-leopard-core';
import PDFDocument = PDFKit.PDFDocument;
import { applyStyle } from '../style/style';

vi.mock('../style/style', () => ({
  applyStyle: vi.fn(),
}));

describe('Tests for CircleDrawer', () => {

  const base: CircleData = {
    type: 'circle',
    x: 10,
    y: 10,
    diameter: 50,
  }
  const mockDoc = {
    circle: vi.fn().mockReturnThis(),
  } as unknown as PDFDocument;
  const scale = createScale({ unit: 'mm' });

  afterEach(() => vi.clearAllMocks());

  test('solid border Circle', () => {
    // Arrange
    const circle = createCircle({
      ...base,
      border: {
        width: 0.25,
        color: '#000000',
        style: StyleType.SOLID,
      }
    });
    const drawer = new CircleDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(circle);
    // Assert
    expect(mockDoc.circle).toHaveBeenCalledTimes(1);
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, circle.border, circle.fillColor, undefined);
    expect(mockDoc.circle).toHaveBeenCalledWith(99.21, 99.21, 70.87);
  });


  test('opacity Circle', () => {
    // Arrange
    const circle = createCircle({
      ...base,
      border: {
        width: 1,
        color: '#000000',
        style: StyleType.SOLID,
      },
      fillColor: '#ff0000',
    });
    // Act
    const drawer = new CircleDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(circle, { opacity: 0.2 });
    // Assert
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, circle.border, circle.fillColor, 0.2);
  });

});
