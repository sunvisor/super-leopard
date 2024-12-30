/**
 * Test for ListDesignDrawer
 *
 * Created by sunvisor on 2025/01/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ListDesignDrawer } from "./ListDesignDrawer";
import { createList } from '../../creator';
import { listData, listWithGroupData } from '../../__test_assets__/drawerTest';

describe('Tests for ListDesignDrawer', () => {

  const mockShapeDrawer = {
    draw: vi.fn(),
  };

  const mockGroupDrawer = {
    draw: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Should draw shapes for specified number of rows and columns', () => {
    // Arrange
    const listDrawer = new ListDesignDrawer(mockGroupDrawer, mockShapeDrawer);
    const list = createList(listData);
    // Act
    listDrawer.draw(list);
    // Assert
    expect(mockShapeDrawer.draw).toHaveBeenCalledTimes(10);
  });

  test('Should draw groups for specified number of rows and columns', () => {
    // Arrange
    const listDrawer = new ListDesignDrawer(mockGroupDrawer, mockShapeDrawer);
    const list = createList(listWithGroupData);
    // Act
    listDrawer.draw(list);
    // Assert
    expect(mockGroupDrawer.draw).toHaveBeenCalledTimes(10);
  });

  test('Should repeated parts are displayed in a lighter color', () => {
    // Arrange
    const listDrawer = new ListDesignDrawer(mockGroupDrawer, mockShapeDrawer);
    const list = createList(listData);
    function checkOpacity(index: number, expected: number) {
      const item = mockShapeDrawer.draw.mock.calls[index];
      expect(item[1].opacity).toBe(expected);
    }
    // Act
    listDrawer.draw(list);
    // Assert
    checkOpacity(0, 1);
    checkOpacity(1, 0.2);
    checkOpacity(9, 0.2);
    expect(mockShapeDrawer.draw).toHaveBeenCalledTimes(10);
  });


});

