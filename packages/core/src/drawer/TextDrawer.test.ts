/**
 * Test for TextDrawer
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { TextDrawer } from "./TextDrawer";
import { createText, Scale, Text } from '../object';
import { Mock } from 'vitest';


describe('Tests for TextDrawer', () => {

  const measurement = {
    measureHeight:(text: Text) => text.font.size,
    measureWidth:(text: Text) => text.text.length * text.font.size,
  }

  const scale = new Scale({
    unit: 'mm',
  });

  const textDrawer = {
    draw: vi.fn()
  }
  const rectDrawer = {
    draw: vi.fn()
  }

  it('should draw text', () => {
    // Arrange
    const drawer = new TextDrawer({
      textElementDrawer: textDrawer,
      rectDrawer,
      measurement,
      scale,
    });
    const shape = createText({
      type: 'text',
      text: 'Hello, World!',
      x: 0,
      y: 0,
      width: 100,
      height: 6,
      font: {
        family: 'Helvetica',
        size: 12,
      }
    });
    // Act
    drawer.draw(shape);
    // Assert
    expect(textDrawer.draw).toHaveBeenCalledTimes(1);
    const text = (textDrawer.draw as Mock).mock.calls[0][0];
    expect(text.text).toBe('Hello, World!');
  });

});
