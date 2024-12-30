/**
 * Test for RectDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { RectDrawer } from "./RectDrawer";
import { createRect, createScale, RectData } from '@sunvisor/super-leopard-core';
import PDFDocument = PDFKit.PDFDocument;
import { borders } from '../__test_assets__';
import { applyStyle } from '../style/style';

vi.mock('../style/style', () => ({
  applyStyle: vi.fn(),
}));

describe('Tests for RectDrawer', () => {

  const base: RectData = {
    type: 'rect',
    x: 10,
    y: 10,
    width: 50,
    height: 40,
  }
  const mockDoc = {
    rect: vi.fn().mockReturnThis(),
  } as unknown as PDFDocument;
  const scale = createScale({ unit: 'mm' });

  afterEach(() => vi.clearAllMocks());

  test('solid border Rect', () => {
    // Arrange
    const rect = createRect({
      ...base,
      border: borders.solid
    });
    const drawer = new RectDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(rect);
    // Assert
    expect(mockDoc.rect).toHaveBeenCalledTimes(1);
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, rect.border, rect.fillColor, undefined);
    expect(mockDoc.rect).toHaveBeenCalledWith(28.35, 28.35, 141.73, 113.39);
  });

  test('opacity rect', () => {
    // Arrange
    const rect = createRect({
      ...base,
      border: borders.solid
    });
    const drawer = new RectDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(rect, { opacity: 0.5 });
    // Assert
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, rect.border, rect.fillColor, 0.5);
  });

});
