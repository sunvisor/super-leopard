/**
 * Test for SerializeImage
 *
 * Created by sunvisor on 2023/12/16.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeImage } from "./serializeImage";
import { Image } from "./Image";
import { ImageShape } from '../shape';


describe('Test for serializeImage', () => {

  it('should return serialized ImageData', () => {
    // Arrange
    const image = new Image({
      x: 10,
      y: 20,
      src: 'image.png',
      width: 100,
      height: 200
    });
    // Act
    const serializedImage = serializeImage(image);
    // Assert
    expect(serializedImage.type).toBe(ImageShape);
    expect(serializedImage.x).toBe(image.x);
    expect(serializedImage.y).toBe(image.y);
    expect(serializedImage.src).toBe(image.src);
    expect(serializedImage.width).toBe(image.width);
    expect(serializedImage.height).toBe(image.height);
  });

});
