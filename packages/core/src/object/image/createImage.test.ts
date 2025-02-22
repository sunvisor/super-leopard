/**
 * Test for CreateImage
 *
 * Created by sunvisor on 2023/12/16.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createImage } from "./createImage";
import { Image } from './Image';
import { ImageShape } from '../shape';
import { ImageData } from '../../data';


describe('Tests for createImage', () => {

  it('should create Image', () => {
    // Arrange
    const data: ImageData = {
      type: ImageShape,
      x: 10,
      y: 20,
      src: 'image.png',
      width: 100,
      height: 200,
    };
    // Act
    const image = createImage(data);
    // Assert
    expect(image.x).toBe(data.x);
    expect(image.y).toBe(data.y);
    expect(image.src).toBe(data.src);
    expect(image.width).toBe(data.width);
    expect(image.height).toBe(data.height);
  });

  it('type is optional', () => {
    // Arrange
    const data: ImageData = {
      x: 10,
      y: 20,
      src: 'image.png',
      width: 100,
      height: 200,
    };
    // Act
    const image = createImage(data);
    // Assert
    expect(image.type).toBe(ImageShape);
    expect(image).toBeInstanceOf(Image);
  })

  it('should throw error if type is invalid', () => {
    // Arrange
    const data: ImageData = {
      // @ts-expect-error Invalid type
      type: 'line',
      x: 10,
      y: 20,
      src: 'image.png',
      width: 100,
      height: 200,
    };
    // Act
    // Assert
    expect(() => createImage(data)).toThrow('Invalid shape type: line');
  });

});
