/**
 * Test for Measurement
 *
 * Created by sunvisor on 2025/02/09.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Measurement } from "./Measurement";
import { describe } from 'vitest';
import { createScale, createText, TextData } from '@sunvisor/super-leopard-core';
import { webFontMap } from '../../__test_assets__';
import { WebFont } from './WebFont';

describe('Tests for Measurement', () => {

  const textData: TextData = {
    type: 'text',
    x: 10,
    y: 1,
    width: 100,
    height: 20,
    text: 'Hello, World!',
    font: {
      family: 'TimesRoman',
      size: 12
    },
    color: '#000000',
  }
  const scale = createScale({ unit: 'in'});
  const text= createText(textData);
  const webFont = new WebFont(webFontMap);
  const measurement = new Measurement({
    scale,
    webFont,
  });

  it('should return height', () => {
    // Act
    const height = measurement.measureHeight(text);
    // Assert
    expect(height).toBe(6.51);
  });

  it('should return width', () => {
    // Act
    const width = measurement.measureWidth(text);
    // Assert
    expect(width).toBe(42.8);
  });

});
