import {
  Position,
  positionsToBox,
  Size,
  CircleShape,
  EllipseShape,
  FieldShape,
  ImageShape,
  LineShape,
  RectShape,
  Shape,
  TextShape,
  Scale,
} from '@sunvisor/super-leopard-core';
import { CreateRect } from './CreateRect';
import { CreateCircle } from './CreateCircle';
import { CreateEllipse } from './CreateEllipse';
import { CreateLine } from './CreateLine';
import { RectRubberBand } from './RectRubberBand';
import { CircleRubberBand } from './CircleRubberBand';
import { EllipseRubberBand } from './EllipseRubberBand';
import { LineRubberBand } from './LineRubberBand';
import { CreateText } from './CreateText';
import { TextRubberBand } from './TextRubberBand';
import { DefaultTextSize } from './DefaultTextSize';
import { DefaultRectSize } from './DefaultRectSize';
import { DefaultLineSize } from './DefaultLineSize';
import { CreateField } from './CreateField';
import { CreateImage } from './CreateImage';
import { DefaultShapeSize, SettingData } from '../../setting';
import { StylesData } from '../../style';
import { AppendShapeType } from '../AppendShapeRubberBand';
import { SvgDrawerInterface, SvgShapeInterface } from '../../../svgDriver';

export type ShapeCreatorInterface = {
  create(start: Position, end: Position): Shape;
}

export type ShapeRubberBandInterface = {
  createElement(): SvgShapeInterface;
  adjustPosition(start: Position, end: Position): Position;
  moveElement(start: Position, end: Position, element: SvgShapeInterface): void;
}

export type DefaultShapeSizeInterface = {
  size(): Size;
}

export type DefaultSizeParams = {
  scale: Scale;
  styles?: StylesData;
  defaultSize: DefaultShapeSize;
}

export function createDefaultShapeSize(type: AppendShapeType, params: DefaultSizeParams) {
  switch (type) {
    case TextShape:
    case FieldShape:
      return new DefaultTextSize(params);
    case LineShape:
      return new DefaultLineSize(params);
    default:
      return new DefaultRectSize(params);
  }
}

export function createShapeCreator(type: AppendShapeType, params: {
  scale: Scale,
  styles: StylesData
}): ShapeCreatorInterface {
  const creators = {
    [RectShape]: CreateRect,
    [CircleShape]: CreateCircle,
    [EllipseShape]: CreateEllipse,
    [LineShape]: CreateLine,
    [TextShape]: CreateText,
    [FieldShape]: CreateField,
    [ImageShape]: CreateImage,
  };

  return new creators[type](params);
}

export function createShapeRubberBand(type: AppendShapeType, params: {
  svg: SvgDrawerInterface,
  scale: Scale,
  styles: StylesData,
  settings: SettingData,
}): ShapeRubberBandInterface {
  const rubberBands = {
    [RectShape]: RectRubberBand,
    [CircleShape]: CircleRubberBand,
    [EllipseShape]: EllipseRubberBand,
    [LineShape]: LineRubberBand,
    [TextShape]: TextRubberBand,
    [FieldShape]: TextRubberBand,
    [ImageShape]: TextRubberBand,
  };

  return new rubberBands[type](params);
}

export function adjustPosition(start: Position, end: Position): Position {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const s = Math.min(Math.abs(dx), Math.abs(dy));
  return {
    x: start.x + (dx < 0 ? -s : s),
    y: start.y + (dy < 0 ? -s : s),
  };
}

export function moveElement(start: Position, end: Position, element: SvgShapeInterface) {
  const box = positionsToBox(start, end);
  element.move(box.x, box.y).size(box.width, box.height);
}
