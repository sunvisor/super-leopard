/**
 * PdfDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  createDataDrawer,
  DataParams, MeasurementInterface,
  Page,
  Scale,
  Shapes,
  ShapesDrawerInterface,
  StaticShapeDrawers
} from '@sunvisor/super-leopard-core';
import { GetPdfImagePath } from '../index';
import { PdfFont } from '../font/pdfFont';
import { CreateShapeDrawerParams } from '../shapeDrawer/ShapeDrawer';
import { CircleDrawer } from '../shapeDrawer/CircleDrawer';
import { EllipseDrawer } from '../shapeDrawer/EllipseDrawer';
import { RectDrawer } from '../shapeDrawer/RectDrawer';
import { LineDrawer } from '../shapeDrawer/LineDrawer';
import { ImageDrawer } from '../shapeDrawer/ImageDrawer';
import { TextElementDrawer } from '../shapeDrawer/TextElementDrawer';
import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';


type PdfDrawerProps = {
  doc: PdfDocumentInterface;
  scale: Scale;
  getImagePath: GetPdfImagePath;
  fonts: PdfFont;
  measurement: MeasurementInterface;
}

export class PdfDrawer {

  private readonly doc: PdfDocumentInterface;
  private readonly drawer: ShapesDrawerInterface;
  private readonly scale: Scale;

  constructor({ doc, getImagePath, scale, fonts, measurement }: PdfDrawerProps) {
    this.doc = doc;
    this.scale = scale;
    this.drawer = createDrawer({
      doc: this.doc,
      scale,
      getImagePath,
      fonts,
      measurement,
    })
  }

  get document(): PdfDocumentInterface {
    return this.doc;
  }

  draw(shapes: Shapes, params?: DataParams) {
    this.drawer.draw(shapes, params);
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
  }

  return createDataDrawer({
    staticShapeDrawers,
    scale: params.scale,
    measurement: params.measurement,
  });
}
