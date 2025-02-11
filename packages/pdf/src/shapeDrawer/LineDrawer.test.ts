/**
 * Test for LineDrawer
 *
 * Created by sunvisor on 2025/02/03.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { LineDrawer } from "./LineDrawer";
import { createLine, Scale } from '@sunvisor/super-leopard-core';
import { mockDoc } from '../__test_assets__';
import { afterEach } from 'vitest';

vi.mock('../style/style', () => ({
  applyStyle: vi.fn(),
}));

describe('Tests for LineDrawer', () => {

  const scale = { toPoint: vi.fn((value) => value) } as unknown as Scale;

  afterEach(() => {
    vi.clearAllMocks();
  })

  it('should draw a line with the correct coordinates', () => {
    // Arrange
    const lineDrawer = new LineDrawer({ doc: mockDoc, scale });
    const line = createLine({
      type: 'line', x1: 10, y1: 20, x2: 30, y2: 40,
      border: {
        color: '#000000',
        width: 1
      }
    });
    // Act
    lineDrawer.draw(line);
    // Assert
    expect(mockDoc.line).toBeCalledWith({
      x1: 10,
      y1: 20,
      x2: 30,
      y2: 40,
      stroke: {
        color: '#000000',
        width: 1,
        style: 'solid',
        cap: 'butt',
        join: 'miter',
      }
    });
  });

});
