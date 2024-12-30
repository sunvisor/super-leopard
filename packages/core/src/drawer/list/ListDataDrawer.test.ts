/**
 * Test for ListDataDrawer
 *
 * Created by sunvisor on 2025/01/28.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ListDataDrawer } from "./ListDataDrawer";
import { FieldValues } from '../../data';
import { createList } from '../../creator';
import { listData, listWithGroupData } from '../../__test_assets__/drawerTest';

describe('Tests for ListDataDrawer', () => {

  const groupDrawer = {
    draw: vi.fn(),
  }
  const shapeDrawer = {
    draw: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  function createListData(length: number): FieldValues[] {
    return Array.from({ length }, (_, index) => {
      return { myField: `value${index + 1}` };
    });
  }

  it('Should throw error when data are not provided', () => {
    // Arrange
    const drawer = new ListDataDrawer(groupDrawer, shapeDrawer);
    const list = createList(listData);
    // Act & Assert
    expect(() => drawer.draw(list)).toThrow('data is required');
  });

  test('Should throw error when data.listRecords are not provided', () => {
    // Arrange
    const drawer = new ListDataDrawer(groupDrawer, shapeDrawer);
    const list = createList(listData);
    // Act & Assert
    expect(() => drawer.draw(list, {})).toThrow('listRecords is required');
  });

  test('Should draw field specified times', () => {
    // Arrange
    const drawer = new ListDataDrawer(groupDrawer, shapeDrawer);
    const list = createList(listData);
    const values = createListData(5);
    // Act
    drawer.draw(list, { listRecords: values });
    // Assert
    expect(shapeDrawer.draw).toHaveBeenCalledTimes(5);
    expect(shapeDrawer.draw).toHaveBeenNthCalledWith(1,
      list.shapes.get(0),
      { values: { myField: 'value1' } }
    );
    expect(shapeDrawer.draw).toHaveBeenNthCalledWith(5,
      list.shapes.get(0),
      { values: { myField: 'value5' } }
    );
  });

  test('Should draw group specified times', () => {
    // Arrange
    const drawer = new ListDataDrawer(groupDrawer, shapeDrawer);
    const list = createList(listWithGroupData);
    const values = createListData(5);
    // Act
    drawer.draw(list, { listRecords: values });
    // Assert
    expect(groupDrawer.draw).toHaveBeenCalledTimes(5);
    expect(groupDrawer.draw).toHaveBeenNthCalledWith(1,
      list.shapes.get(1),
      { values: { myField: 'value1' } }
    );
  });

});
