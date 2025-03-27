/**
 * Test for DefaultLineSize
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DefaultLineSize } from "./DefaultLineSize";
import { Scale, DPPX, UnitType } from '@sunvisor/super-leopard-core';
import { defaultSettings } from '@/settings';

describe('Test of DefaultLineSize#size', () => {

  it('should return default size', () => {
    // Arrange
    const scale = new Scale({ unit: UnitType.INCH });
    const defaultSize = defaultSettings.defaultShapeSize;
    // Act
    const result = new DefaultLineSize({ scale, defaultSize });
    // Assert
    expect(result.size()).toEqual({
      width: DPPX,
      height: 0,
    });
  });

});
