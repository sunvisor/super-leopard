/**
 * Test for TextElementDrawer
 *
 * Created by sunvisor on 2025/02/09.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TextElementDrawer } from './TextElementDrawer';
import {
  createScale,
  createText,
  MeasurementInterface,
  Text,
  TextData,
} from '@sunvisor/super-leopard-core';
import { WebFont } from './WebFont';
import { SvgDrawerInterface, SvgTextInterface } from '../../svgDriver';
import { Mock } from '@storybook/test';


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
  const scale = createScale({ unit: 'mm' });
  const dummyFont = { name: 'Arial', size: 12, weight: 'normal', style: 'normal' }
  let mockSvg: SvgDrawerInterface;
  let mockTextElement: SvgTextInterface;
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
    } as unknown as SvgTextInterface;
    mockSvg = {
      text: vi.fn(),
    } as unknown as SvgDrawerInterface;
    mockWebFont = {
      svgFontParams: vi.fn(),
      textDecoration: vi.fn(),
    } as unknown as WebFont;
  });


  it('should draw a text element at the correct position', () => {
    // Arrange
    const drawer = new TextElementDrawer({
      svg: mockSvg, scale, webFont: mockWebFont, measurement: mockMeasurement
    });
    const text: Text = createText(textData);
    (mockWebFont.svgFontParams as Mock).mockReturnValue(dummyFont);
    (mockWebFont.textDecoration as Mock).mockReturnValue('underline');
    // Act
    drawer.draw(text);
    // Assert
    expect(mockSvg.text).toHaveBeenCalledWith({
      text: text.text,
      font: dummyFont,
      x: scale.toPixel(text.x),
      y: scale.toPixel(text.y),
      width: scale.toPixel(text.width),
      height: scale.toPixel(text.height),
      fillColor: text.color.color,
      textDecoration: 'underline',
      opacity: 1,
    });
  });

});
