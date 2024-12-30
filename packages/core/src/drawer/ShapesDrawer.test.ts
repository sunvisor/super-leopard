/**
 * Test for ShapesDrawer
 *
 * Created by sunvisor on 2025/01/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ShapesDrawer } from "./ShapesDrawer";
import { createShapes } from '../creator';
import { RectData } from '../data';


describe('Tests for ShapesDrawer', () => {

  const mockShapeDrawer = {
    draw: vi.fn(),
  }
  const mockGroupDrawer = {
    draw: vi.fn(),
  }
  const mockListDrawer = {
    draw: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

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

  test('Should draw shape when shape type is static shape', () => {
    // Arrange
    const shapes = createShapes([rectData]);
    const drawer = new ShapesDrawer(mockShapeDrawer, mockGroupDrawer, mockListDrawer);
    // Act
    drawer.draw(shapes);
    // Assert
    expect(mockShapeDrawer.draw).toBeCalledTimes(1);
  });

  test('Should draw shape shapes count times', () => {
    // Arrange
    const shapes = createShapes([rectData, rectData]);
    const drawer = new ShapesDrawer(mockShapeDrawer, mockGroupDrawer, mockListDrawer);
    // Act
    drawer.draw(shapes, {});
    // Assert
    expect(mockShapeDrawer.draw).toBeCalledTimes(2);
    const result = mockShapeDrawer.draw.mock.calls;
    expect(result[0][1]).toEqual({ values: {} });
  });

  test('Should draw group when shape type is group', () => {
    // Arrange
    const shapes = createShapes([{
      type: 'group',
      shapes: [rectData],
    }]);
    const params = { values: { foo: 'bar' } };
    const drawer = new ShapesDrawer(mockShapeDrawer, mockGroupDrawer, mockListDrawer);
    // Act
    drawer.draw(shapes, params);
    // Assert
    expect(mockGroupDrawer.draw).toBeCalledTimes(1);
    const result = mockGroupDrawer.draw.mock.calls;
    expect(result[0][1]).toEqual(params);
  });

  test('Should draw list when shape type is list', () => {
    // Arrange
    const shapes = createShapes([{
      type: 'list',
      shapes: [{
        type: 'field',
        name: 'field1',
        shape: {
          type: 'text',
          x: 0,
          y: 0,
          width: 50,
          height: 8,
          color: '#000000',
          font: {
            family: 'serif',
            size: 12
          }
        }
      }],
    }]);
    const params = {
      values: { foo: 'bar' },
      pageNumber: 1,
      listRecords: [],
    }
    const drawer = new ShapesDrawer(mockShapeDrawer, mockGroupDrawer, mockListDrawer);
    // Act
    drawer.draw(shapes, params);
    // Assert
    expect(mockListDrawer.draw).toBeCalledTimes(1);
    const result = mockListDrawer.draw.mock.calls;
    expect(result[0][1]).toEqual({ pageNumber: 1, listRecords: [] });
  });
});
