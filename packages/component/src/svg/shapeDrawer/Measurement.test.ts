/**
 * Test for Measurement
 *
 * Created by sunvisor on 2025/02/09.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Measurement } from "./Measurement";
import { beforeEach, describe } from 'vitest';
import { createScale, createText, TextData } from '@sunvisor/super-leopard-core';
import { testFontMap } from '@/__test_assets__';
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
      family: 'sans-serif',
      size: 12
    },
    color: '#000000',
  }
  const scale = createScale({ unit: 'in'});
  const text= createText(textData);
  const webFont = new WebFont(testFontMap);
  const measurement = new Measurement({
    scale,
    webFont,
  });

  beforeEach(() => {
    const mockCanvas = {
      getContext: vi.fn(() => ({
        measureText: vi.fn(() => ({
          width: 100,
          actualBoundingBoxAscent: 10,
          actualBoundingBoxDescent: 50,
        })),
      })),
    };
    // DOM での canvas 要素をモック
    document.createElement = vi.fn(() => mockCanvas as any);
  })

  it('should return height', () => {
    // Act
    const height = measurement.measureHeight(text);
    // Assert
    expect(height).toBe(scale.pointFromPixel(60));
  });

  it('should return width', () => {
    // Act
    const width = measurement.measureWidth(text);
    // Assert
    expect(width).toBe(scale.pointFromPixel(100));
  });

});
