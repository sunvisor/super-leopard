/**
 * Test for DefaultRectSize
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DefaultRectSize } from "./DefaultRectSize";
import { Scale, DPPX, UnitType } from '@sunvisor/super-leopard-core';
import { defaultSettings } from '../../../settings';

describe('Test for DefaultRectSize#size', () => {

  it('should return default size', () => {
    // Arrange
    const scale = new Scale({ unit: UnitType.INCH });
    const defaultSize = defaultSettings.defaultShapeSize;
    // Act
    const result = new DefaultRectSize({ scale, defaultSize });
    // Assert
    expect(result.size()).toEqual({
      width: DPPX,
      height: DPPX,
    });
  });

});
