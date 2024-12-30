/**
 * Test for TextElementDrawer
 *
 * Created by sunvisor on 2025/02/09.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Svg, Text as SvgText } from '@svgdotjs/svg.js';
import TextElementDrawer from './TextElementDrawer';
import {
  AlignType,
  createScale,
  createText,
  MeasurementInterface,
  Text,
  TextData,
} from '@sunvisor/super-leopard-core';
import { WebFont } from './WebFont';


describe('TextElementDrawer', () => {

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
  const scale = createScale({ unit: 'mm'});
  let mockSvg: Svg;
  let mockTextElement: SvgText;
  let mockWebFont: WebFont;
  const mockMeasurement: MeasurementInterface = {
    measureWidth: (text: Text) => text.font.size * text.text.length,
    measureHeight: (text: Text) => text.font.size,
  };

  beforeEach(() => {
    mockTextElement = {
      text: vi.fn(() => mockTextElement),
      fill: vi.fn().mockReturnThis(),
      move: vi.fn().mockReturnThis(),
      attr: vi.fn().mockReturnThis(),
    } as unknown as SvgText;
    mockSvg = {
      text: vi.fn(() => mockTextElement),
    } as unknown as Svg;
    mockWebFont = {
      apply: vi.fn(),
    } as unknown as WebFont;
  });


  it('should create a text element and move it to the correct position', () => {
    // Arrange
    const drawer = new TextElementDrawer({
      svg: mockSvg, scale, webFont: mockWebFont, measurement: mockMeasurement
    });
    const text: Text = createText(textData);
    // Act
    drawer.draw(text);
    // Assert
    expect(mockSvg.text).toHaveBeenCalled();
    expect(mockTextElement.move).toHaveBeenCalledWith(scale.toPixel(10), scale.toPixel(1));
  });

  it('should apply web font correctly', () => {
    // Arrange
    const drawer = new TextElementDrawer({
      svg: mockSvg, scale, webFont: mockWebFont, measurement: mockMeasurement
    });
    const text: Text = createText(textData);
    // Act
    drawer.draw(text);
    expect(mockWebFont.apply).toHaveBeenCalled();
  });

  it('should set letter spacing for JUSTIFY_ALL alignment', () => {
    // Arrange
    const drawer = new TextElementDrawer({
      svg: mockSvg, scale, webFont: mockWebFont, measurement: mockMeasurement
    });
    const text: Text = createText({
      ...textData,
      align: AlignType.JUSTIFY_ALL
    });
    // Act
    drawer.draw(text);
    // Assert
    const l = 'Hello, World!'.length;
    const s = (text.width - l * scale.fromPoint(12) ) / (l - 1);
    expect(mockTextElement.attr).toHaveBeenCalledWith('letter-spacing', scale.toPixel(s));
  });

});
