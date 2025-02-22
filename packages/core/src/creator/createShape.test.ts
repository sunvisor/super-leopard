/**
 * Test for CreateShape
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createShape } from "./createShape";
import {
  Circle,
  CircleShape,
  Ellipse,
  EllipseShape,
  Image,
  ImageShape,
  Line,
  LineShape,
  Rect,
  RectShape,
  Text,
  TextShape
} from "../object";
import { CircleData, EllipseData, FontData, LineData, RectData, TextData } from '../data';

type BoxData = {
  x: number;
  y: number;
  width: number;
  height: number;
}

describe('Tests for createShape', () => {

  it('should return Circle if type is circle', () => {
    // Arrange
    const data: CircleData = { type: CircleShape, x: 1, y: 2, diameter: 3 };
    // Act
    const shape = createShape(data) as Circle;
    // Assert
    expect(shape.type).toEqual(data.type);
    expect(shape.x).toEqual(data.x);
    expect(shape.y).toEqual(data.y);
    expect(shape.diameter).toEqual(data.diameter);
  });

  function assertBox(shape: BoxData, data: BoxData) {
    expect(shape.x).toEqual(data.x);
    expect(shape.y).toEqual(data.y);
    expect(shape.width).toEqual(data.width);
    expect(shape.height).toEqual(data.height);
  }

  it('should return Ellipse if type is ellipse', () => {
    // Arrange
    const data: EllipseData = { type: EllipseShape, x: 1, y: 2, width: 3, height: 4 };
    // Act
    const shape = createShape(data) as Ellipse;
    // Assert
    expect(shape.type).toEqual(data.type);
    assertBox(shape, data);
  });

  it('should return Rect if type is rect', () => {
    // Arrange
    const data: RectData = { type: RectShape, x: 1, y: 2, width: 3, height: 4 };
    // Act
    const shape = createShape(data) as Rect;
    // Assert
    expect(shape.type).toEqual(data.type);
    assertBox(shape, data);
  });

  it('should return Line if type is line', () => {
    // Arrange
    const data: LineData = { type: LineShape, x1: 1, y1: 2, x2: 3, y2: 4 };
    // Act
    const shape = createShape(data) as Line;
    // Assert
    expect(shape.type).toEqual(data.type);
    expect(shape.x1).toEqual(data.x1);
    expect(shape.y1).toEqual(data.y1);
    expect(shape.x2).toEqual(data.x2);
    expect(shape.y2).toEqual(data.y2);
  });

  it('should return Text if type is text', () => {
    // Arrange
    const font: FontData = { family: 'serif', size: 12 };
    const data: TextData = { type: TextShape, x: 1, y: 2, width: 100, height: 7, text: 'text', font };
    // Act
    const shape = createShape(data) as Text;
    // Assert
    expect(shape.type).toEqual(data.type);
    expect(shape.x).toEqual(data.x);
    expect(shape.y).toEqual(data.y);
    expect(shape.width).toEqual(data.width);
    expect(shape.height).toEqual(data.height);
    expect(shape.text).toEqual(data.text);
  });

  it('should return Image if type is image', () => {
    // Arrange
    const data = { type: ImageShape, x: 1, y: 2, width: 3, height: 4, src: 'image.png' };
    // Act
    const shape = createShape(data) as Image;
    // Assert
    expect(shape.type).toEqual(data.type);
    expect(shape.src).toEqual(data.src);
  });

});
