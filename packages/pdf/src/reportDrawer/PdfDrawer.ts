/**
 * PdfDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  createDataDrawer,
  DataParams,
  Page,
  Scale,
  Shapes,
  ShapesDrawerInterface,
  StaticShapeDrawers
} from '@sunvisor/super-leopard-core';
import { CreateShapeDrawerParams, PdfDrawerProps } from '../shapeDrawer/ShapeDrawer';
import { CircleDrawer } from '../shapeDrawer/CircleDrawer';
import { EllipseDrawer } from '../shapeDrawer/EllipseDrawer';
import { RectDrawer } from '../shapeDrawer/RectDrawer';
import { LineDrawer } from '../shapeDrawer/LineDrawer';
import { ImageDrawer } from '../shapeDrawer/ImageDrawer';
import { TextElementDrawer } from '../shapeDrawer/TextElementDrawer';
import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { BarcodeDrawer } from '../shapeDrawer/BarcodeDrawer';


export class PdfDrawer {

  private readonly doc: PdfDocumentInterface;
  private readonly drawer: ShapesDrawerInterface;
  private readonly scale: Scale;

  constructor({ doc, scale, ...rest }: PdfDrawerProps) {
    this.doc = doc;
    this.scale = scale;
    this.drawer = createDrawer({
      doc: this.doc,
      scale,
      ...rest
    });
  }

  get document(): PdfDocumentInterface {
    return this.doc;
  }

  draw(shapes: Shapes, params?: DataParams) {
    this.drawer.draw(shapes, params);
  }

  open(stream: NodeJS.WritableStream) {
    this.doc.open(stream);
  }

  close() {
    this.doc.close();
  }

  addPage(page: Page) {
    this.doc.addPage({
      size: this.getSize(page),
      margin: 0,
    });
  }

  private getSize(page: Page) {
    if (typeof page.size === 'string') {
      return page.size;
    }
    return [
      this.scale.toPoint(page.width),
      this.scale.toPoint(page.height),
    ];
  }

}

function createDrawer(params: CreateShapeDrawerParams) {
  const staticShapeDrawers: StaticShapeDrawers = {
    circle: new CircleDrawer(params),
    ellipse: new EllipseDrawer(params),
    rect: new RectDrawer(params),
    line: new LineDrawer(params),
    image: new ImageDrawer(params),
    text: new TextElementDrawer(params),
    barcode: new BarcodeDrawer(params),
  }

  return createDataDrawer({
    staticShapeDrawers,
    scale: params.scale,
    measurement: params.measurement,
  });
}
