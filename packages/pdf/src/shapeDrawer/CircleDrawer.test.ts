/**
 * Test for CircleDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { CircleDrawer } from "./CircleDrawer";
import { CircleData, createCircle, Scale, StyleType } from '@sunvisor/super-leopard-core';
import { mockDoc } from '../__test_assets__';


describe('Tests for CircleDrawer', () => {

  const base: CircleData = {
    type: 'circle',
    x: 10,
    y: 10,
    diameter: 50,
  }
  const scale = { toPoint: vi.fn((value) => value) } as unknown as Scale;

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
    expect(mockDoc.circle).toHaveBeenCalledWith({
      x: 10 + 25,
      y: 10 + 25,
      radius: 25,
      stroke: {
        color: '#000000',
        width: 0.25,
        style: 'solid',
        cap: 'butt',
        join: 'miter',
      }
    });
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
    expect(mockDoc.circle).toHaveBeenCalledWith({
      x: 10 + 25,
      y: 10 + 25,
      radius: 25,
      stroke: {
        color: '#000000',
        width: 1,
        style: 'solid',
        cap: 'butt',
        join: 'miter',
      },
      fillColor: '#ff0000',
      opacity: 0.2
    });

  });

});
