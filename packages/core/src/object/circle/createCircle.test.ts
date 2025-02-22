/**
 * Test for CreateCircle
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createCircle } from "./createCircle";
import { Circle } from './Circle';
import { BorderData, CircleData } from '../../data';
import { CircleShape } from '../shape';


describe('Tests for createCircle', () => {

  it('type is optional', () => {
    // Arrange
    const data: CircleData = { x: 0, y: 0, diameter: 0 };
    // Act
    const circle = createCircle(data);
    // Assert
    expect(circle.type).toEqual(CircleShape);
    expect(circle).toBeInstanceOf(Circle);
  });

  it('should create a circle', () => {
    // Arrange
    const border: BorderData = { width: 1, color: '#000000', style: 'solid', cap: 'round', join: 'bevel' };
    const data: CircleData = {
      type: CircleShape,
      x: 0, y: 0, diameter: 0, border, fillColor: '#ffffff'
    };
    // Act
    const circle = createCircle(data);
    // Assert
    expect(circle.x).toEqual(data.x);
    expect(circle.y).toEqual(data.y);
    expect(circle.radius).toEqual(data.diameter);
    expect(circle.border?.width).toEqual(border.width);
    expect(circle.border?.color?.color).toEqual(border.color);
    expect(circle.border?.style).toEqual(border.style);
    expect(circle.border?.cap).toEqual(border.cap);
    expect(circle.border?.join).toEqual(border.join);
  });

  test('border and fillColor should be undefined if not specified', () => {
    // Arrange
    const data = { type: CircleShape, x: 0, y: 0, diameter: 0 };
    // Act
    const circle = createCircle(data);
    // Assert
    expect(circle.border).toBeUndefined();
    expect(circle.fillColor).toBeUndefined();
  });

  it('should throw an error for invalid shape type', () => {
    // Arrange
    // @ts-expect-error Invalid type
    const data: CircleData = { type: 'rect', x: 0, y: 0, diameter: 0 };
    // Act
    // Assert
    expect(() => createCircle(data)).toThrow('Invalid shape type: rect');
  });

});
