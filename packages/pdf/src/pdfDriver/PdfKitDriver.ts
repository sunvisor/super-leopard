/**
 * PdfDocument
 *
 * Created by sunvisor on 2025/02/11.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { StyleType } from '@sunvisor/super-leopard-core';
import {
  CircleParams,
  EllipseParams,
  FontParams, ImageParams,
  LineParams, MeasurementParams,
  PdfDocumentInterface, PdfDriverInterface,
  RectParams, RegisterFontParams, StrokeOptions, TextParams
} from './PdfDriverInterface';
import SVGtoPDF from 'svg-to-pdfkit';
import PDFDocument = PDFKit.PDFDocument;
import PdfDocument from 'pdfkit';


export const pdfKitDriver: PdfDriverInterface = {
  createDocument(): PdfDocumentInterface {
    const doc = new PdfDocument({
      autoFirstPage: false,
    });
    return new PdfKitDocument(doc);
  }
}

export class PdfKitDocument implements PdfDocumentInterface {
  private readonly doc: PDFKit.PDFDocument;

  constructor(doc: PDFDocument) {
    this.doc = doc;
  }

  addPage(params: Record<string, any>): void {
    this.doc.addPage(params);
  }

  font(params: FontParams): void {
    this.doc
      .font(params.name)
      .fontSize(params.size);
  }

  registerFont({ name, src }: RegisterFontParams): void {
    this.doc.registerFont(name, src);
  }

  circle({ x, y, radius, stroke, fillColor, opacity }: CircleParams): void {
    this.doc.circle(x, y, radius);
    this.drawVector(stroke, fillColor, opacity);
  }

  ellipse({ x, y, rx, ry, stroke, fillColor, opacity }: EllipseParams): void {
    this.doc.ellipse(x, y, rx, ry);
    this.drawVector(stroke, fillColor, opacity);
  }

  rect({ x, y, width, height, stroke, fillColor, opacity }: RectParams): void {
    this.doc.rect(x, y, width, height);
    this.drawVector(stroke, fillColor, opacity);
  }

  line({ x1, y1, x2, y2, stroke, opacity }: LineParams): void {
    this.doc.moveTo(x1, y1).lineTo(x2, y2);
    this.drawVector(stroke, undefined, opacity);
  }

  text({ text, x, y, font, options, fillColor, opacity }: TextParams): void {
    if (font) {
      this.font(font);
    }
    this.doc.fillColor(fillColor || '#000000');
    this.doc.text(text, x, y, options || {}).opacity(opacity || 1);
  }

  image({ src, svg, x, y, width, height }: ImageParams): void {
    if (src) {
      this.doc.image(src, x, y, {
        width: width,
        height: height,
        fit: [width, height],
      });
    }
    if (svg) {
      SVGtoPDF(this.doc, svg, x, y, { width: width, height: height });
    }
  }

  measureHeight(params: MeasurementParams): number {
    if (params.font) {
      this.font(params.font);
    }
    return this.doc.heightOfString('X');
  }

  measureWidth(params: MeasurementParams): number {
    if (params.font) {
      this.font(params.font);
    }
    return this.doc.widthOfString(params.text);
  }

  open(stream: NodeJS.WritableStream): void {
    this.doc.pipe(stream);
  }

  close(): void {
    this.doc.end();
  }

  private applyStroke(stroke: StrokeOptions, opacity?: number): void {
    this.doc.opacity(opacity || 1);
    if (stroke.style === StyleType.SOLID) {
      this.doc.undash();
    }
    if (stroke.style === StyleType.DASHED) {
      this.doc.dash(4, { space: 4 });
    }
    if (stroke.style === StyleType.DOTTED) {
      this.doc.dash(1, { space: 2 });
    }
    this.doc
      .lineJoin(stroke.join)
      .lineCap(stroke.cap)
      .lineWidth(stroke.width)
      .strokeColor(stroke.color);
  }

  private applyFill(color: string, opacity?: number): void {
    this.doc.fillOpacity(opacity || 1);
    this.doc.fillColor(color)
  }

  private drawVector(stroke: StrokeOptions, fill: string, opacity?: number): void {
    if (stroke && fill) {
      this.applyStroke(stroke, opacity);
      this.applyFill(fill, opacity);
      this.doc.fillAndStroke(fill, stroke.color);
    } else if (stroke) {
      this.applyStroke(stroke, opacity);
      this.doc.stroke(stroke.color);
    } else if (fill) {
      this.applyFill(fill, opacity);
      this.doc.fill(fill);
    }
  }
}
