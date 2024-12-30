/**
 * Test for Grouping
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { grouping, ungrouping } from "./grouping";
import { Shapes } from '../shapes';
import { GroupShape, RectShape } from '../shape';
import { Group } from './Group';
import { createTestShapes } from '../../__test_assets__';


describe('Tests for grouping', () => {

  test('Should return Shapes that group the specified elements', () => {
    // Arrange
    const shapes = new Shapes(createTestShapes());
    const targets = new Shapes([shapes.get(1), shapes.get(2)]);
    // Act
    const { shapes: newShapes, group } = grouping(shapes, targets);
    // Assert
    expect(shapes.count).toBe(5);
    expect(newShapes.count).toBe(4);
    expect(newShapes.get(1).type).toEqual(GroupShape);
    expect((newShapes.get(1) as Group).shapes.count).toBe(2);
    expect(group.type).toEqual(GroupShape);
  });

});

describe('Tests for ungrouping', () => {

  test('Should return Shapes that ungroup the specified Group', () => {
    // Arrange
    const shapes = new Shapes(createTestShapes());
    const target = shapes.get(4) as Group;
    // Act
    const { shapes: newShapes, items } = ungrouping(shapes, target);
    // Assert
    expect(newShapes.count).toBe(5);
    expect(newShapes.get(4).type).toEqual(RectShape);
    expect(items).toHaveLength(1);
  });

});
