/**
 * Test for TextDesignDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { TextDesignDrawer } from "./TextDesignDrawer";
import { afterEach } from 'vitest';
import { createText } from '../creator';
import { Rect, Text } from '../object';

describe('Tests for TextDesignDrawer', () => {

  const textDrawer = {
    draw: vi.fn()
  }
  const rectDrawer = {
    draw: vi.fn()
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should draw text with bounding box', () => {
    // Arrange
    const drawer = new TextDesignDrawer({
      textDrawer, rectDrawer, borderColor: '#d3d3d3'
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
    expect(rectDrawer.draw).toHaveBeenCalledTimes(1);
    const rectResult = rectDrawer.draw.mock.calls;
    const rect = rectResult[0][0] as Rect;
    expect(rect.bbox).toEqual({ x: 0, y: 0, width: 100, height: 6 });
    expect(rect.border.color.color).toEqual('#d3d3d3');
    const textResult = textDrawer.draw.mock.calls;
    const text = textResult[0][0] as Text;
    expect(text.text).toBe('Hello, World!');
  });

});
