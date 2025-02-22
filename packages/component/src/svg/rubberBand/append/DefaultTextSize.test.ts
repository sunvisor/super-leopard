/**
 * Test for DefaultTextSize
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DefaultTextSize } from "./DefaultTextSize";
import { DPPX, UnitType, Scale } from '@sunvisor/super-leopard-core';
import { defaultSettings } from '../../../settings';
import { defaultStyle } from '../../style';

describe('Test for DefaultTextSize#size', () => {

  it('should return default size', () => {
    // Arrange
    const scale = new Scale({ unit: UnitType.INCH });
    const styles = defaultStyle;
    const defaultSize = defaultSettings.defaultShapeSize;
    // Act
    const result = new DefaultTextSize({ scale, styles, defaultSize });
    // Assert
    expect(result.size()).toEqual({
      width: DPPX,
      height: scale.pointToPixel(styles.font.size * 1.2),
    });
  });
});
