/**
 * Test for EllipseDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { EllipseDrawer } from "./EllipseDrawer";
import { createEllipse, createScale, EllipseData, EllipseShape } from '@sunvisor/super-leopard-core';
import PDFDocument = PDFKit.PDFDocument;
import { applyStyle } from '../style/style';

vi.mock('../style/style', () => ({
  applyStyle: vi.fn(),
}));

describe('Tests for EllipseDrawer', () => {

  const base: EllipseData = {
    type: EllipseShape,
    x: 10,
    y: 10,
    width: 40,
    height: 30,
  }
  const mockDoc = {
    ellipse: vi.fn().mockReturnThis(),
  } as unknown as PDFDocument;
  const scale = createScale({ unit: 'mm' });

  afterEach(() => vi.clearAllMocks());

  test('solid border Ellipse', () => {
    // Arrange
    const ellipse = createEllipse({
      ...base,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'solid',
      }
    });
    const drawer = new EllipseDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(ellipse);
    // Assert
    expect(mockDoc.ellipse).toHaveBeenCalledTimes(1);
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, ellipse.border, ellipse.fillColor, undefined);
    expect(mockDoc.ellipse).toHaveBeenCalledWith(85.04, 70.87, 56.695, 42.52);
  });

  test('opacity Ellipse', () => {
    // Arrange
    const ellipse = createEllipse({
      ...base,
      border: {
        width: 1,
        color: '#000000',
        style: 'solid',
      }
    });
    const drawer = new EllipseDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(ellipse, { opacity: 0.5 });
    // Assert
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, ellipse.border, ellipse.fillColor, 0.5);
  });

});
