/**
 * Test for SerializeGroup
 *
 * Created by sunvisor on 2023/12/28.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeGroup } from "./serializeShape";
import { createGroup, createShapes } from '../creator';
import { GroupData } from '../data';
import { serializeShapes } from './serializeShape';
import { GroupShape } from '../object';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


describe('Test for serializeGroup', () => {

  it('should return serialized GroupData', () => {
    // Arrange
    const groupData: GroupData = {
      type: GroupShape,
      shapes: shapeTestData,
      width: 30,
      height: 30,
    }
    const group = createGroup(groupData);
    // Act
    const result = serializeGroup(group);
    // Assert
    expect(result).toEqual({
      width: 30,
      height: 30,
      type: GroupShape,
      shapes: serializeShapes(group.shapes),
    });
  });

  it('should set width and height when width and height are not specified', () => {
    // Arrange
    const groupData: GroupData = {
      type: GroupShape,
      shapes: shapeTestData,
    }
    const group = createGroup(groupData);
    // Act
    const result = serializeGroup(group);
    // Assert
    expect(result).toEqual({
      width: createShapes(shapeTestData).bbox.width,
      height: createShapes(shapeTestData).bbox.height,
      type: GroupShape,
      shapes: serializeShapes(group.shapes),
    });
  });

});
