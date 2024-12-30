/**
 * Test for ExpandImage
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandImage } from "./expandImage";
import { createImage } from '../creator';
import { ImageShape } from '../object';

describe('Test for expandImage', () => {

  test('Should expand image to ImagePropertyValue', () => {
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
    const expandedImage = expandImage(image);
    // Assert
    expect(expandedImage).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      src: 'https://example.com/image.png',
    });
  });
});
