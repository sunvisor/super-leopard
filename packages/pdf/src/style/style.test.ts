/**
 * Test for Border
 *
 * Created by sunvisor on 2024/03/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { applyBorderStyle, applyFillColor, applyStyle } from './style';
import PDFDocument = PDFKit.PDFDocument;
import { Border, Color, createBorder, createColor } from '@sunvisor/super-leopard-core';
import { describe, expect } from 'vitest';

describe('Tests for style', () => {

  describe('Tests for applyBorderStyle', () => {
    let doc: PDFDocument;

    beforeEach(() => {
      doc = {
        lineJoin: vi.fn().mockReturnThis(),
        lineCap: vi.fn().mockReturnThis(),
        lineWidth: vi.fn().mockReturnThis(),
        strokeColor: vi.fn().mockReturnThis(),
        dash: vi.fn().mockReturnThis(),
        undash: vi.fn().mockReturnThis(),
      } as unknown as PDFDocument;
    });

    test('should return the same doc if border is undefined', () => {
      // Act
      applyBorderStyle(doc, undefined);
      // Assert
      expect(doc.lineJoin).not.toHaveBeenCalled();
      expect(doc.lineCap).not.toHaveBeenCalled();
      expect(doc.lineWidth).not.toHaveBeenCalled();
      expect(doc.strokeColor).not.toHaveBeenCalled();
    });

    test('should apply all border styles when border is defined', () => {
      // Arrange
      const border: Border = createBorder({
        join: 'miter',
        cap: 'butt',
        width: 2,
        color: '#ff0000',
      })
      // Act
      applyBorderStyle(doc, border);
      // Assert
      expect(doc.lineJoin).toHaveBeenCalledWith('miter');
      expect(doc.lineCap).toHaveBeenCalledWith('butt');
      expect(doc.lineWidth).toHaveBeenCalledWith(2);
      expect(doc.strokeColor).toHaveBeenCalledWith('#ff0000');
    });

    test('should apply dash style when border style is dashed', () => {
      // Arrange
      const border: Border = createBorder({
        join: 'miter',
        cap: 'butt',
        width: 2,
        color: '#ff0000',
        style: 'dashed',
      });
      // Act
      applyBorderStyle(doc, border);
      // Assert
      expect(doc.dash).toHaveBeenCalledWith(4, { space: 4 });
    });

    test('should apply dot style when border style is dotted', () => {
      // Arrange
      const border: Border = createBorder({
        join: 'miter',
        cap: 'butt',
        width: 2,
        color: '#ff0000',
        style: 'dotted',
      });
      // Act
      applyBorderStyle(doc, border);
      // Assert
      expect(doc.dash).toHaveBeenCalledWith(1, { space: 2 });
    });

  });

  describe('Tests for applyFillColor', () => {
    let doc: PDFDocument;

    beforeEach(() => {
      doc = {
        fillColor: vi.fn(),
      } as unknown as PDFDocument;
    });

    test('should return the same doc if color is undefined', () => {
      // Act
      applyFillColor(doc, undefined);
      // Assert
      expect(doc.fillColor).not.toHaveBeenCalled();
    });

    test('should apply fillColor when color is defined', () => {
      // Arrange
      const color: Color = createColor('#00ff00');
      // Act
      applyFillColor(doc, color);
      // Assert
      expect(doc.fillColor).toHaveBeenCalledWith('#00ff00');
    });

  });

  describe('Tests for applyStyle', () => {
    let doc: PDFDocument;

    beforeEach(() => {
      doc = {
        lineJoin: vi.fn().mockReturnThis(),
        lineCap: vi.fn().mockReturnThis(),
        lineWidth: vi.fn().mockReturnThis(),
        strokeColor: vi.fn().mockReturnThis(),
        dash: vi.fn().mockReturnThis(),
        undash: vi.fn().mockReturnThis(),
        fillColor: vi.fn().mockReturnThis(),
        fill: vi.fn().mockReturnThis(),
        stroke: vi.fn().mockReturnThis(),
        fillAndStroke: vi.fn().mockReturnThis(),
      } as unknown as PDFDocument;
    });

    test('doc should not changed if all styles are undefined', () => {
      // Act
      applyStyle(doc, undefined, undefined);
      // Assert
      expect(doc.fill).not.toHaveBeenCalled();
      expect(doc.stroke).not.toHaveBeenCalled();
      expect(doc.fillAndStroke).not.toHaveBeenCalled();
    });

    test('should apply border style when border is defined', () => {
      // Arrange
      const border: Border = createBorder({
        join: 'miter',
        cap: 'butt',
        width: 2,
        color: '#ff0000',
      });
      // Act
      applyStyle(doc, border, undefined);
      // Assert
      expect(doc.lineJoin).toHaveBeenCalledWith('miter');
      expect(doc.lineCap).toHaveBeenCalledWith('butt');
      expect(doc.lineWidth).toHaveBeenCalledWith(2);
      expect(doc.strokeColor).toHaveBeenCalledWith('#ff0000');
      expect(doc.fill).not.toHaveBeenCalled();
      expect(doc.stroke).toHaveBeenCalled();
      expect(doc.fillAndStroke).not.toHaveBeenCalled();
      expect(doc.undash).toHaveBeenCalled();
    });

    test('should apply fill color when fill color is defined', () => {
      // Arrange
      const fillColor = createColor('#00ff00');
      // Act
      applyStyle(doc, undefined, fillColor);
      // Assert
      expect(doc.fillColor).toHaveBeenCalledWith('#00ff00');
      expect(doc.fill).toHaveBeenCalled();
      expect(doc.stroke).not.toHaveBeenCalled();
      expect(doc.fillAndStroke).not.toHaveBeenCalled();
    });

    test('should apply all styles when all styles are defined', () => {
      // Arrange
      const border: Border = createBorder({
        join: 'miter',
        cap: 'butt',
        width: 2,
        color: '#ff0000',
        style: 'dashed',
      });
      const fillColor = createColor('#00ff00');
      // Act
      applyStyle(doc, border, fillColor);
      // Assert
      expect(doc.lineJoin).toHaveBeenCalledWith('miter');
      expect(doc.lineCap).toHaveBeenCalledWith('butt');
      expect(doc.lineWidth).toHaveBeenCalledWith(2);
      expect(doc.dash).toHaveBeenCalledWith(4, { space: 4 });
      expect(doc.fillAndStroke).toHaveBeenCalled();
    });
  });

});
