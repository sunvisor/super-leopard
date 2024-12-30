/**
 * Test for ExpandGroup
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandGroup } from "./expandGroup";
import { DirectionType, GroupShape } from '../object';
import { createGroup } from '../creator';

describe('Test for expandGroup', () => {

  test('Should expand group to GroupPropertyValue', () => {
    // Arrange
    const group = createGroup({
      type: GroupShape,
      width: 100,
      height: 100,
      repeatCount: 1,
      direction: DirectionType.HORIZONTAL,
      shapes: [{
        type: 'rect', x: 0, y: 0, width: 10, height: 10,
      }]
    })
    // Act
    const expanded = expandGroup(group);
    // Assert
    expect(expanded).toEqual({
      width: 100,
      height: 100,
      repeatCount: 1,
      direction: DirectionType.HORIZONTAL,
    });
  });

});
