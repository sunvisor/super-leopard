/**
 * Test for EllipseDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { EllipseDrawer } from "./EllipseDrawer";
import { createEllipse, EllipseData, EllipseShape, Scale } from '@sunvisor/super-leopard-core';
import { mockDoc } from '../__test_assets__';


describe('Tests for EllipseDrawer', () => {

  const base: EllipseData = {
    type: EllipseShape,
    x: 10,
    y: 10,
    width: 40,
    height: 30,
  }
  const scale = { toPoint: vi.fn((value) => value) } as unknown as Scale;

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
    expect(mockDoc.ellipse).toHaveBeenCalledWith({
      x: 10 + 40 / 2,
      y: 10 + 30 / 2,
      rx: 40 / 2,
      ry: 30 / 2,
      stroke: {
        color: '#000000',
        width: 0.25,
        style: 'solid',
        cap: 'butt',
        join: 'miter',
      }
    });
  });

  test('opacity Ellipse', () => {
    // Arrange
    const ellipse = createEllipse({
      ...base,
      fillColor: '#ff0000',
      border: {
        width: 0.25,
        color: '#000000',
        style: 'solid',
      }
    });
    const drawer = new EllipseDrawer({ doc: mockDoc, scale });
    // Act
    drawer.draw(ellipse, { opacity: 0.5 });
    // Assert
    expect(mockDoc.ellipse).toHaveBeenCalledWith({
      x: 10 + 40 / 2,
      y: 10 + 30 / 2,
      rx: 40 / 2,
      ry: 30 / 2,
      stroke: {
        color: '#000000',
        width: 0.25,
        style: 'solid',
        cap: 'butt',
        join: 'miter',
      },
      fillColor: '#ff0000',
      opacity: 0.5
    });
  });

});
