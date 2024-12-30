/**
 * Test for ContractImage
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractImage } from "./contractImage";
import { ImagePropertyValue } from '../expander';
import { Image } from '../object';

describe('Test for contractImage', () => {

  test('Should return Image', () => {
    // Arrange
    const propertyValue: ImagePropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      src: 'https://example.com/image.png',
    }
    // Act
    const image = contractImage(propertyValue);
    // Assert
    expect(image).toBeInstanceOf(Image);
    expect(image.x).toBe(0);
    expect(image.y).toBe(0);
    expect(image.width).toBe(100);
    expect(image.height).toBe(100);
    expect(image.src).toBe('https://example.com/image.png');
  });
});
