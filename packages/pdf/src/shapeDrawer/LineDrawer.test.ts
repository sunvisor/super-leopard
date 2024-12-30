/**
 * Test for LineDrawer
 *
 * Created by sunvisor on 2025/02/03.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { LineDrawer } from "./LineDrawer";
import PdfDocument from 'pdfkit';
import { createLine, Scale } from '@sunvisor/super-leopard-core';
import { applyStyle } from '../style/style';

vi.mock('../style/style', () => ({
  applyStyle: vi.fn(),
}));

describe('Tests for LineDrawer', () => {

  it('should draw a line with the correct coordinates', () => {
    const mockDoc = new PdfDocument();
    mockDoc.moveTo = vi.fn().mockReturnThis();
    mockDoc.lineTo = vi.fn().mockReturnThis();

    const mockScale = {
      toPoint: vi.fn(({ x1, y1, x2, y2 }) => ({ x1, y1, x2, y2 })),
    } as unknown as Scale;

    const lineDrawer = new LineDrawer({ doc: mockDoc, scale: mockScale });
    const line = createLine({ type: 'line', x1: 10, y1: 20, x2: 30, y2: 40, border: {} });

    lineDrawer.draw(line);

    expect(mockScale.toPoint).toHaveBeenCalledWith({ x1: 10, y1: 20, x2: 30, y2: 40 });
    expect(mockDoc.moveTo).toHaveBeenCalledWith(10, 20);
    expect(mockDoc.lineTo).toHaveBeenCalledWith(30, 40);
    expect(applyStyle).toHaveBeenCalledWith(mockDoc, line.border, undefined, undefined);
  });

});
