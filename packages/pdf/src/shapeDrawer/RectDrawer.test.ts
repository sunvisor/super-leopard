/**
 * Test for RectDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { RectDrawer } from "./RectDrawer";
import { createRect, RectData, Scale } from '@sunvisor/super-leopard-core';
import { borders, mockDoc } from '../__test_assets__';


describe('Tests for RectDrawer', () => {

  const base: RectData = {
    type: 'rect',
    x: 10,
    y: 10,
    width: 50,
    height: 40,
  }
  const scale = { toPoint: vi.fn((value) => value) } as unknown as Scale;

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
    expect(mockDoc.rect).toHaveBeenCalledWith({
      x: 10,
      y: 10,
      width: 50,
      height: 40,
      stroke: {
        color: borders.solid.color,
        width: borders.solid.width,
        style: borders.solid.style,
        cap: 'butt',
        join: 'miter',
      }
    });
  });

  test('opacity rect', () => {
    // Arrange
    const rect = createRect({
      ...base,
      fillColor: '#ff0000',
      border: borders.solid
    });
    const drawer = new RectDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(rect, { opacity: 0.5 });
    // Assert
    expect(mockDoc.rect).toHaveBeenCalledWith({
      x: 10,
      y: 10,
      width: 50,
      height: 40,
      stroke: {
        color: borders.solid.color,
        width: borders.solid.width,
        style: borders.solid.style,
        cap: 'butt',
        join: 'miter',
      },
      fillColor: '#ff0000',
      opacity: 0.5
    });
  });

});
