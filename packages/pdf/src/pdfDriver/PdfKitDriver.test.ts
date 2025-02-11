/**
 * Test for PdfKitDriver
 *
 * Created by sunvisor on 2025/02/11.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { PdfKitDocument, pdfKitDriver } from "./PdfKitDriver";
import {
  CircleParams,
} from './PdfDriverInterface';
import { afterEach, beforeEach, expect, vi } from 'vitest';
import PDFDocument = PDFKit.PDFDocument;
import SVGtoPDF from 'svg-to-pdfkit';

vi.mock('svg-to-pdfkit');

describe('Tests for PdfKitDriver', () => {

  it('Tests for createDocument', () => {
    // Act
    const pdf = pdfKitDriver.createDocument();
    // Assert
    expect(pdf).not.toBeNull();
  });

});

describe('Tests for PdfKitDocument', () => {

  const pdfKit = {
    addPage: vi.fn(),
    font: vi.fn().mockReturnThis(),
    fontSize: vi.fn().mockReturnThis(),
    circle: vi.fn().mockReturnThis(),
    rect: vi.fn().mockReturnThis(),
    ellipse: vi.fn().mockReturnThis(),
    image: vi.fn().mockReturnThis(),
    text: vi.fn().mockReturnThis(),
    moveTo: vi.fn().mockReturnThis(),
    lineTo: vi.fn().mockReturnThis(),
    fill: vi.fn().mockReturnThis(),
    stroke: vi.fn().mockReturnThis(),
    fillAndStroke: vi.fn().mockReturnThis(),
    opacity: vi.fn().mockReturnThis(),
    undash: vi.fn().mockReturnThis(),
    dash: vi.fn().mockReturnThis(),
    lineJoin: vi.fn().mockReturnThis(),
    lineCap: vi.fn().mockReturnThis(),
    lineWidth: vi.fn().mockReturnThis(),
    strokeColor: vi.fn().mockReturnThis(),
    fillOpacity: vi.fn().mockReturnThis(),
    fillColor: vi.fn().mockReturnThis(),
    heightOfString: vi.fn().mockReturnValue(10),
    widthOfString: vi.fn().mockReturnValue(50),
    registerFont: vi.fn().mockReturnThis(),
  } as unknown as PDFDocument;

  let doc: PdfKitDocument;
  beforeEach(() => {
    doc = new PdfKitDocument(pdfKit);
  });

  describe('Tests for addPage method', () => {

    it('should call addPage of PDFDocument', () => {
      // Act
      doc.addPage({ size: 'A4'});
      // Assert
      expect(pdfKit.addPage).toBeCalledWith({
        size: 'A4',
      });
    });

  });

  describe('Tests for font method', () => {

    it('should call font and fontSize of PDFDocument', () => {
      // Arrange
      const params = {
        name: 'Times New Roman',
        size: 12
      };
      // Act
      doc.font(params);
      // Assert
      expect(pdfKit.font).toBeCalledWith(params.name);
      expect(pdfKit.fontSize).toBeCalledWith(params.size);
    });

  });

  describe('Tests for registerFont method', () => {

    it('should call registerFont of PDFDocument', () => {
      // Arrange
      const name = 'NotoSansJP-Regular';
      const src = '/path/to/NotoSansJP-Regular.ttf';
      // Act
      doc.registerFont({ name, src });
      // Assert
      expect(pdfKit.registerFont).toBeCalledWith(name, src);
    });
  });

  describe('Tests for circle method', () => {

    const base = {
      x: 10,
      y: 10,
      radius: 50,
    }
    const stroke = {
      width: 0.25,
      color: '#000000',
      style: 'solid',
      cap: 'round',
      join: 'bevel'
    };
    const fillColor = '#FFFFFF';

    afterEach(() => {
      vi.clearAllMocks();
    })

    it('should call circle of PDFDocument', () => {
      // Arrange
      const params: CircleParams = {
        ...base,
        fillColor,
      };
      // Act
      doc.circle(params);
      // Assert
      expect(pdfKit.circle).toBeCalledWith(params.x, params.y, params.radius);
    });

    it('should set stroke options when stroke is set', () => {
      // Act
      doc.circle({ ...base, stroke });
      // Assert
      expect(pdfKit.strokeColor).toBeCalledWith(stroke.color);
      expect(pdfKit.lineWidth).toBeCalledWith(stroke.width);
      expect(pdfKit.lineCap).toBeCalledWith(stroke.cap);
      expect(pdfKit.lineJoin).toBeCalledWith(stroke.join);
      expect(pdfKit.stroke).toBeCalledTimes(1);
    });

    it('should set fill options when fillColor is set', () => {
      // Act
      doc.circle({ ...base, fillColor });
      // Assert
      expect(pdfKit.fillColor).toBeCalledWith(fillColor);
      expect(pdfKit.fill).toBeCalledTimes(1);
    });

    it('should set opacity when opacity is set', () => {
      // Act
      doc.circle({ ...base, fillColor, stroke, opacity: 0.5 });
      // Assert
      expect(pdfKit.opacity).toBeCalledWith(0.5);
      expect(pdfKit.fillOpacity).toBeCalledWith(0.5);
    });

  });

  describe('Tests for rect method', () => {

    it('should call rect of PDFDocument', () => {
      // Arrange
      const params = {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
      };
      // Act
      doc.rect(params);
      // Assert
      expect(pdfKit.rect).toBeCalledWith(params.x, params.y, params.width, params.height);
    });

  });

  describe('Tests for ellipse method', () => {

    it('should call ellipse of PDFDocument', () => {
      // Arrange
      const params = {
        x: 10,
        y: 10,
        rx: 50,
        ry: 50,
      };
      // Act
      doc.ellipse(params);
      // Assert
      expect(pdfKit.ellipse).toBeCalledWith(params.x, params.y, params.rx, params.ry);
    });

  });

  describe('Tests for text method', () => {

    const base = {
      text: 'Test',
      x: 10,
      y: 10,
    }

    it('should call text of PDFDocument', () => {
      // Arrange
      const params = base;
      // Act
      doc.text(params);
      // Assert
      expect(pdfKit.text).toBeCalledWith(params.text, params.x, params.y, {});
    });

    it('should call font of PDFDocument when font is set', () => {
      // Arrange
      const params = {
        ...base,
        font: {
          name: 'Times New Roman',
          size: 12
        }
      };
      // Act
      doc.text(params);
      // Assert
      expect(pdfKit.font).toBeCalledWith(params.font.name);
      expect(pdfKit.fontSize).toBeCalledWith(params.font.size);
    });

    it('should call text of PDFDocument with options when options is set', () => {
      // Arrange
      const params = {
        ...base,
        options: {
          align: 'center'
        }
      };
      // Act
      doc.text(params);
      // Assert
      expect(pdfKit.text).toBeCalledWith(params.text, params.x, params.y, params.options);
    });

    it('should call fillColor of PDFDocument', () => {
      // Arrange
      const params = {
        ...base,
        fillColor: '#FFFFFF'
      };
      // Act
      doc.text(params);
      // Assert
      expect(pdfKit.fillColor).toBeCalledWith(params.fillColor);
    });

  });

  describe('Tests for image method', () => {

    it('should call image of PDFDocument when src is set', () => {
      // Arrange
      const params = {
        src: 'image.png',
        x: 10,
        y: 10,
        width: 50,
        height: 50,
      };
      // Act
      doc.image(params);
      // Assert
      expect(pdfKit.image).toBeCalledWith(params.src, params.x, params.y, {
        width: params.width,
        height: params.height,
        fit: [params.width, params.height]
      });
    });

    it('should call SVGtoPDF of PDFDocument when svg is set', () => {
      // Arrange
      const params = {
        svg: '<svg></svg>',
        x: 10,
        y: 10,
        width: 50,
        height: 50,
      };
      // Act
      doc.image(params);
      // Assert
      expect(SVGtoPDF).toBeCalledWith(pdfKit, params.svg, params.x, params.y, {
        width: params.width,
        height: params.height
      });
    });

  });

  describe('Tests for measureHeight method', () => {

    it('should call heightOfString of PDFDocument', () => {
      // Arrange
      const params = {
        text: 'Test',
      };
      // Act
      const result = doc.measureHeight(params);
      // Assert
      expect(pdfKit.heightOfString).toBeCalledWith('X');
      expect(result).toBe(10);
    });

    it('should call font of PDFDocument when font is set', () => {
      // Arrange
      const params = {
        text: 'Test',
        font: {
          name: 'Times New Roman',
          size: 12
        }
      }
      // Act
      doc.measureHeight(params);
      // Assert
      expect(pdfKit.font).toBeCalledWith(params.font.name);
      expect(pdfKit.fontSize).toBeCalledWith(params.font.size);
    });

  });

  describe('Tests for measureWidth method', () => {

    it('should call widthOfString of PDFDocument', () => {
      // Arrange
      const params = {
        text: 'Test',
      };
      // Act
      const result = doc.measureWidth(params);
      // Assert
      expect(pdfKit.widthOfString).toBeCalledWith(params.text);
      expect(result).toBe(50);
    });

    it('should call font of PDFDocument when font is set', () => {
      // Arrange
      const params = {
        text: 'Test',
        font: {
          name: 'Times New Roman',
          size: 12
        }
      }
      // Act
      doc.measureWidth(params);
      // Assert
      expect(pdfKit.font).toBeCalledWith(params.font.name);
      expect(pdfKit.fontSize).toBeCalledWith(params.font.size);
    });

  });

});
