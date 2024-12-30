/**
 * Test for SerializeShape
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeShape } from "./serializeShape";
import {
  Circle,
  CircleShape,
  Ellipse,
  EllipseShape,
  ImageShape,
  Line,
  LineShape,
  Rect,
  RectShape,
  Text,
  TextShape
} from "../object";
import { createShape } from '../creator';
import { CircleData, EllipseData, LineData, RectData, TextData } from "../data";

describe('Tests for serializeShape', () => {

  test('Serialize a Rect object', () => {
    // Arrange
    const rect = createShape({ type: RectShape, x: 1, y: 2, width: 3, height: 4 }) as Rect;
    // Act
    const shape = serializeShape(rect) as RectData;
    // Assert
    expect(shape.type).toEqual(rect.type);
    expect(shape.x).toEqual(rect.x);
    expect(shape.y).toEqual(rect.y);
    expect(shape.width).toEqual(rect.width);
    expect(shape.height).toEqual(rect.height);
  });

  test('Serialize a Line object', () => {
    // Arrange
    const line = createShape({ type: LineShape, x1: 1, y1: 2, x2: 3, y2: 4 }) as Line;
    // Act
    const shape = serializeShape(line) as LineData;
    // Assert
    expect(shape.type).toEqual(line.type);
    expect(shape.x1).toEqual(line.x1);
    expect(shape.y1).toEqual(line.y1);
    expect(shape.x2).toEqual(line.x2);
    expect(shape.y2).toEqual(line.y2);
  });

  test('Serialize a Circle object', () => {
    // Arrange
    const circle = createShape({ type: CircleShape, x: 1, y: 2, diameter: 3 }) as Circle;
    // Act
    const shape = serializeShape(circle) as CircleData;
    // Assert
    expect(shape.type).toEqual(circle.type);
    expect(shape.x).toEqual(circle.x);
    expect(shape.y).toEqual(circle.y);
    expect(shape.diameter).toEqual(circle.diameter);
  });

  test('Serialize a Ellipse object', () => {
    // Arrange
    const ellipse = createShape({ type: EllipseShape, x: 1, y: 2, width: 3, height: 4 }) as Ellipse;
    // Act
    const shape = serializeShape(ellipse) as EllipseData;
    // Assert
    expect(shape.type).toEqual(ellipse.type);
    expect(shape.x).toEqual(ellipse.x);
    expect(shape.y).toEqual(ellipse.y);
    expect(shape.width).toEqual(ellipse.width);
    expect(shape.height).toEqual(ellipse.height);
  });

  test('Serialize a Text object', () => {
    // Arrange
    const data = {
      type: TextShape,
      x: 1,
      y: 2,
      width: 100,
      height: 7,
      text: 'text',
      font: {
        family: 'serif',
        size: 12
      },
      color: '#000000',
    };
    const text = createShape(data) as Text;
    // Act
    const shape = serializeShape(text) as TextData;
    // Assert
    expect(shape).toEqual(data);
  });

  test('Serialize a Image object', () => {
    // Arrange
    const data = {
      type: ImageShape,
      x: 1,
      y: 2,
      src: 'sunvisorlab_icon.png',
      width: 3,
      height: 4
    };
    const image = createShape(data) as Text;
    // Act
    const shape = serializeShape(image) as TextData;
    // Assert
    expect(shape).toEqual(data);
  });

});
