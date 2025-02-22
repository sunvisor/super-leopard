/**
 * Test for CreateEllipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createEllipse } from "./createEllipse";
import { Ellipse } from './Ellipse';
import { BorderData, EllipseData } from '../../data';
import { EllipseShape } from '../shape';


describe('Tests for createEllipse', () => {

  it('type is optional', () => {
    // Arrange
    const data: EllipseData = { x: 1, y: 2, height: 3, width: 4 };
    // Act
    const ellipse = createEllipse(data);
    // Assert
    expect(ellipse.type).toEqual(EllipseShape);
    expect(ellipse).toBeInstanceOf(Ellipse);
  });

  it('should create Ellipse', () => {
    // Arrange
    const border: BorderData = { width: 1, color: '#000000', style: 'solid', cap: 'round', join: 'bevel' };
    const data: EllipseData = {
      type: EllipseShape,
      x: 1, y: 2, width: 3, height: 4, border, fillColor: '#ffffff'
    };
    // Act
    const ellipse = createEllipse(data);
    // Assert
    expect(ellipse.x).toEqual(data.x);
    expect(ellipse.y).toEqual(data.y);
    expect(ellipse.height).toEqual(data.height);
    expect(ellipse.width).toEqual(data.width);
    expect(ellipse.border?.width).toEqual(border.width);
    expect(ellipse.border?.color?.color).toEqual(border.color);
    expect(ellipse.border?.style).toEqual(border.style);
    expect(ellipse.border?.cap).toEqual(border.cap);
    expect(ellipse.border?.join).toEqual(border.join);
  });

  test('border and fillColor should be undefined if not specified', () => {
    // Arrange
    const data = { type: EllipseShape, x: 1, y: 2, height: 3, width: 4 };
    // Act
    const ellipse = createEllipse(data);
    // Assert
    expect(ellipse.border).toBeUndefined();
    expect(ellipse.fillColor).toBeUndefined();
  });

  it('should throw error if type is invalid', () => {
    // Arrange
    // @ts-expect-error Invalid type
    const data: EllipseData = { type: 'circle', x: 1, y: 2, height: 3, width: 4 };
    // Act
    // Assert
    expect(() => createEllipse(data)).toThrow('Invalid shape type: circle');
  });
});
