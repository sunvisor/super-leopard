/**
 * Test for CreateImage
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CreateImage } from "./CreateImage";
import { Image, ImageShape, Scale, UnitType } from '@sunvisor/super-leopard-core';

describe('Test for CreateImage#create', () => {
  const scale = new Scale({ unit: UnitType.INCH });

  it('should return Image object', () => {
    // Arrange
    const createImage = new CreateImage({ scale });
    // Act
    const result = createImage.create({ x: 10, y: 10 }, { x: 100, y: 110 });
    // Assert
    expect(result).toBeInstanceOf(Image);
    expect(result.type).toBe(ImageShape);
    const image = result as Image;
    expect(image.x).toBe(scale.fromPixel(10));
    expect(image.y).toBe(scale.fromPixel(10));
    expect(image.width).toBe(scale.fromPixel(90));
    expect(image.height).toBe(scale.fromPixel(100));
    expect(image.src).toBe('');
  });

});
