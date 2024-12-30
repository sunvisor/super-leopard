/**
 * Test for ExpandShape
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandShape } from "./expandShape";
import { createCircle, createEllipse, createImage, createLine, createRect, createText } from '../creator';
import { CircleShape, EllipseShape, ImageShape, LineShape, RectShape, TextShape } from '../object';

describe('Tests for expandShape', () => {

  test('Should expand circle when passed Circle', () => {
    // Arrange
    const circle = createCircle({
      type: CircleShape,
      x: 10,
      y: 20,
      diameter: 30,
      fillColor: '#FF0000',
      border: {
        color: '#00FF00',
        width: 2,
        cap: 'round',
        join: 'bevel',
      },
    });
    // Act
    const expandedCircle = expandShape(circle);
    // Assert
    expect(expandedCircle).toEqual({
      x: 10,
      y: 20,
      diameter: 30,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderColor: '#00FF00',
      borderWidth: 2,
      borderStyle: 'solid',
      borderCap: 'round',
      borderJoin: 'bevel',
    });
  });

  test('Should expand ellipse when passed Ellipse', () => {
    // Arrange
    const ellipse = createEllipse({
      type: EllipseShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      fillColor: '#FF0000',
      border: {
        color: '#00FF00',
        width: 2,
        cap: 'round',
        join: 'bevel',
      },
    });
    // Act
    const expandedEllipse = expandShape(ellipse);
    // Assert
    expect(expandedEllipse).toEqual({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderColor: '#00FF00',
      borderWidth: 2,
      borderStyle: 'solid',
      borderCap: 'round',
      borderJoin: 'bevel',
    });
  });


  test('Should expand image when passed Image', () => {
    // Arrange
    const image = createImage({
      type: ImageShape,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      src: 'https://example.com/image.png',
    });
    // Act
    const expandedImage = expandShape(image);
    // Assert
    expect(expandedImage).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      src: 'https://example.com/image.png',
    });
  });

  test('Should expand line when passed Line', () => {
    // Arrange
    const line = createLine({
      type: LineShape,
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      border: {
        style: 'solid',
        width: 1,
        color: '#000000',
        cap: 'butt',
        join: 'miter',
      }
    });
    // Act
    const expandedLine = expandShape(line);
    // Assert
    expect(expandedLine).toEqual({
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    });
  });

  test('Should expand rect when passed Rect', () => {
    // Arrange
    const rect = createRect({
      type: RectShape,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fillColor: '#FF0000',
      border: {
        style: 'solid',
        width: 1,
        color: '#000000',
        cap: 'butt',
        join: 'miter',
      }
    });
    // Act
    const expandedRect = expandShape(rect);
    // Assert
    expect(expandedRect).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    });
  });

  test('Should expand text when passed Text', () => {
    // Arrange
    const text = createText({
      type: TextShape,
      text: 'text',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      font: {
        family: 'sans-serif',
        size: 12,
        style: 'bold',
      },
      color: '#000000',
      fillColor: '#FF0000',
      align: 'left',
      valign: 'middle',
      multiLine: true,
      linePitch: 7,
      fitCell: false,
    });
    // Act
    const expandedText = expandShape(text);
    // Assert
    expect(expandedText).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      color: '#000000',
      useFillColor: true,
      fillColor: '#FF0000',
      fontFamily: 'sans-serif',
      fontSize: 12,
      fontStyle: ['bold'],
      align: 'left',
      valign: 'middle',
      multiLine: true,
      linePitch: 7,
      fitCell: false,
    });
  });

});
