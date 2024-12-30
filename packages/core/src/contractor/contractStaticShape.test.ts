/**
 * Test for ContractStaticShape
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractStaticShape } from "./contractStaticShape";
import {
  CirclePropertyValue,
  EllipsePropertyValue,
  ImagePropertyValue,
  LinePropertyValue,
  TextPropertyValue
} from '../expander';
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
} from '../object';

describe('Tests for contractStaticShape', () => {

  test('Should return Circle when type is CircleShape', () => {
    // Arrange
    const propertyValue: CirclePropertyValue = {
      x: 1,
      y: 2,
      diameter: 3,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const circle = contractStaticShape(CircleShape, propertyValue);
    // Assert
    expect(circle).toBeInstanceOf(Circle);
  });

  test('Should return Ellipse when type is EllipseShape', () => {
    // Arrange
    const propertyValue: EllipsePropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#00FF00',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const ellipsis = contractStaticShape(EllipseShape, propertyValue);
    // Assert
    expect(ellipsis).toBeInstanceOf(Ellipse);
  });

  test('Should return Image when type is ImageShape', () => {
    // Arrange
    const propertyValue: ImagePropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      src: 'https://example.com/image.png',
    }
    // Act
    const image = contractStaticShape(ImageShape, propertyValue);
    // Assert
    expect(image).toBeInstanceOf(Image);
  });

  test('Should return Line when type is LineShape', () => {
    // Arrange
    const propertyValue: LinePropertyValue = {
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
    }
    // Act
    const line = contractStaticShape(LineShape, propertyValue);
    // Assert
    expect(line).toBeInstanceOf(Line);
  });

  test('Should return Rect when type is RectShape', () => {
    // Arrange
    const propertyValue: EllipsePropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#00FF00',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const ellipsis = contractStaticShape(RectShape, propertyValue);
    // Assert
    expect(ellipsis).toBeInstanceOf(Rect);
  });

  test('Should return Text when type is TextShape', () => {
    // Arrange
    const propertyValue: TextPropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      text: 'test',
      useFillColor: true,
      fillColor: '#FF0000',
      fontFamily: 'sans-serif',
      fontSize: 12,
      fontStyle: ['bold', 'italic'],
      color: '#000000',
      align: 'left',
      valign: 'middle',
      fitCell: false,
      multiLine: true,
      linePitch: 7,
    }
    // Act
    const text = contractStaticShape(TextShape, propertyValue);
    // Assert
    expect(text).toBeInstanceOf(Text);
  });

});
