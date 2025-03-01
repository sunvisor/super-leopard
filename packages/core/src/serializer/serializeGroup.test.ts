/**
 * Test for SerializeGroup
 *
 * Created by sunvisor on 2023/12/28.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeGroup } from "./serializeShape";
import { createGroup } from '../creator';
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
    }
    const group = createGroup(groupData);
    // Act
    const result = serializeGroup(group);
    // Assert
    expect(result).toEqual({
      type: GroupShape,
      shapes: serializeShapes(group.shapes),
    });
  });

});
