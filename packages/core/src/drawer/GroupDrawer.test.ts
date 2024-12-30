/**
 * Test for GroupDrawer
 *
 * Created by sunvisor on 2025/01/26.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { GroupDrawer } from "./GroupDrawer";
import { createGroup } from '../creator';
import { RectData } from '../data';
import { beforeEach, describe, expect } from 'vitest';


describe('Tests for GroupDrawer', () => {

  const shapeDrawer = {
    draw: vi.fn(),
  }

  const rectData: RectData = {
    type: 'rect',
    x: 10,
    y: 20,
    width: 30,
    height: 40,
    border: {
      width: 1,
      color: '#000000',
    }
  }

  beforeEach(() => {
    shapeDrawer.draw.mockReset();
  });

  test('Should call draw method of static shape drawer each group item', () => {
    // Arrange
    const drawer = new GroupDrawer(shapeDrawer)
    const group = createGroup({
      width: 100,
      height: 100,
      shapes: [rectData, rectData, rectData],
      type: 'group'
    });
    // Act
    drawer.draw(group, {});
    // Assert
    expect(shapeDrawer.draw).toHaveBeenCalledTimes(3);
  });

  test('Should call draw method of static shape drawer whenever nested group', () => {
    // Arrange
    const drawer = new GroupDrawer(shapeDrawer)
    const group = createGroup({
      width: 100,
      height: 100,
      shapes: [
        {
          type: 'group',
          width: 100,
          height: 100,
          shapes: [rectData, rectData, rectData],
        },
      ],
      type: 'group'
    });
    // Act
    drawer.draw(group, {});
    // Assert
    expect(shapeDrawer.draw).toHaveBeenCalledTimes(3);
  });

  describe('Tests for repeat', () => {

    beforeEach(() => {
      shapeDrawer.draw.mockReset();
    });

    test('Should call draw method of static shape drawer repeat count times', () => {
      // Arrange
      const drawer = new GroupDrawer(shapeDrawer)
      const group = createGroup({
        shapes: [rectData],
        repeatCount: 2,
        type: 'group'
      });
      // Act
      drawer.draw(group, {});
      // Assert
      expect(shapeDrawer.draw).toHaveBeenCalledTimes(2);
    });

    test('y axis should be increased by height when direction is vertical', () => {
      // Arrange
      const drawer = new GroupDrawer(shapeDrawer)
      const group = createGroup({
        shapes: [rectData],
        repeatCount: 2,
        type: 'group',
        width: 50,
        height: 100,
        direction: 'vertical',
      });
      // Act
      drawer.draw(group, {});
      // Assert
      expect(shapeDrawer.draw).toHaveBeenCalledTimes(2);
      expect(shapeDrawer.draw).toHaveBeenNthCalledWith(1,
        expect.objectContaining({
          bbox: expect.objectContaining({ x: 10, y: 20 })
        }),
        {}
      );
      expect(shapeDrawer.draw).toHaveBeenNthCalledWith(2,
        expect.objectContaining({
          bbox: expect.objectContaining({ x: 10, y: 120 })
        }),
        {}
      );
    });

    test('x axis should be increased by width when direction is horizontal', () => {
      // Arrange
      const drawer = new GroupDrawer(shapeDrawer)
      const group = createGroup({
        shapes: [rectData],
        repeatCount: 2,
        type: 'group',
        width: 50,
        height: 100,
        direction: 'horizontal',
      });
      // Act
      drawer.draw(group, {});
      // Assert
      expect(shapeDrawer.draw).toHaveBeenCalledTimes(2);
      expect(shapeDrawer.draw).toHaveBeenNthCalledWith(1,
        expect.objectContaining({
          bbox: expect.objectContaining({ x: 10, y: 20 })
        }),
        {}
      );
      expect(shapeDrawer.draw).toHaveBeenNthCalledWith(2,
        expect.objectContaining({
          bbox: expect.objectContaining({ x: 60, y: 20 })
        }),
        {}
      );
    });

  });

});
