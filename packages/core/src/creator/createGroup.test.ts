/**
 * Test for CreateGroup
 *
 * Created by sunvisor on 2023/12/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createGroup, createGroupFromShapes, createShapes } from "./createShape";
import { DirectionType, GroupConfig, GroupShape } from '../object';
import { GroupData } from '../data';
import { shapeTestData } from '../__test_assets__';


describe('Tests for createGroup', () => {

  test('Create Group', () => {
    // Arrange
    const groupData: GroupData = {
      type: GroupShape,
      shapes: shapeTestData,
    }
    // Act
    const group = createGroup(groupData);
    // Assert
    expect(group.type).toBe(GroupShape);
  });

  test('Create Group that repeats vertically', () => {
    // Arrange
    const groupData: GroupData = {
      type: GroupShape,
      shapes: shapeTestData,
      repeatCount: 2,
      direction: DirectionType.VERTICAL,
      width: 100,
      height: 20,
    }
    // Act
    const group = createGroup(groupData);
    // Assert
    expect(group.type).toBe(GroupShape);
    expect(group.direction).toBe(DirectionType.VERTICAL);
    expect(group.repeatCount).toBe(2);
    expect(group.width).toBe(100);
    expect(group.height).toBe(20);
  });

  test('Create Group from Shapes', () => {
    // Arrange
    const groupData: GroupConfig = {
      shapes: createShapes(shapeTestData),
    }
    // Act
    const group = createGroupFromShapes(groupData);
    // Assert
    expect(group.type).toBe(GroupShape);
    expect(group.shapes.count).toEqual(groupData.shapes.count);
  });

  test('Should throw error when invalid shape type', () => {
    // Arrange
    // @ts-expect-error Invalid type
    const groupData: GroupData = { type: 'rect', shapes: shapeTestData }
    // Act
    // Assert
    expect(() => createGroup(groupData)).toThrow('Invalid shape type: rect');
  });

});
