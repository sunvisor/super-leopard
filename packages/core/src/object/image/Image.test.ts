/**
 * Test for Image
 *
 * Created by sunvisor on 2023/12/16.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Image } from "./Image";
import { ImageShape } from '../shape';
import { Box, Position } from '../../value';
import { describe } from 'vitest';


describe('Tests for Image', () => {
  const config = {
    x: 10,
    y: 20,
    src: 'image.png',
    width: 100,
    height: 200
  };

  describe('Test for  Image', () => {

    test('Creating Image instance', () => {
      // Arrange
      // Act
      const image = new Image(config);
      // Assert
      expect(image.type).toBe(ImageShape);
      expect(image.x).toBe(config.x);
      expect(image.y).toBe(config.y);
      expect(image.src).toBe(config.src);
      expect(image.width).toBe(config.width);
      expect(image.height).toBe(config.height);
    });

    test('width should be positive', () => {
      // Arrange
      const wrongConfig = {
        ...config,
        width: -10,
      }
      // Act
      expect(() => new Image(wrongConfig)).toThrow('width must be positive');
    });
    test('height should be positive', () => {
      // Arrange
      const wrongConfig = {
        ...config,
        height: -10,
      }
      // Act
      expect(() => new Image(wrongConfig)).toThrow('height must be positive');
    });

  });

  describe('Test for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const image = new Image(config);
      // Act
      const bbox = image.bbox;
      // Assert
      expect(bbox.x).toBe(config.x);
      expect(bbox.y).toBe(config.y);
      expect(bbox.width).toBe(config.width);
      expect(bbox.height).toBe(config.height);
    });

  });

  describe('Test for config', () => {

    it('should return config values', () => {
      // Arrange
      const image = new Image(config);
      // Act
      const result = image.config;
      // Assert
      expect(result.x).toBe(config.x);
      expect(result.y).toBe(config.y);
      expect(result.src).toBe(config.src);
      expect(result.width).toBe(config.width);
      expect(result.height).toBe(config.height);
    });

  });

  describe('Test for set', () => {

    it('should return new instance with updated x', () => {
      // Arrange
      const image = new Image(config);
      // Act
      const newImage = image.set('x', 11);
      // Assert
      expect(image.x).toBe(config.x);
      expect(newImage.x).toBe(11);
      assertOtherProperties(newImage, image, ['x']);
    });

    it('should return a new instance with updated y', () => {
      // Arrange
      const image = new Image(config);
      // Act
      const newImage = image.set('y', 12);
      // Assert
      expect(image.y).toBe(config.y);
      expect(newImage.y).toBe(12);
      assertOtherProperties(newImage, image, ['y']);
    });

    it('should return a new instance with updated src', () => {
      // Arrange
      const image = new Image(config);
      // Act
      const newImage = image.set('src', 'image2.png');
      // Assert
      expect(image.src).toBe(config.src);
      expect(newImage.src).toBe('image2.png');
      assertOtherProperties(newImage, image, ['src']);
    });

    it('should return a new instance with updated width', () => {
      // Arrange
      const image = new Image(config);
      const newWidth = 11; // 10w
      // Act
      const newImage = image.set('width', newWidth);
      // Assert
      expect(image.width).toBe(config.width);
      expect(newImage.width).toBe(newWidth);
      assertOtherProperties(newImage, image, ['width']);
    });

    it('should return a new instance with updated height', () => {
      // Arrange
      const image = new Image(config);
      const newHeight = 12; // 10h
      // Act
      const newImage = image.set('height', newHeight);
      // Assert
      expect(image.height).toBe(config.height);
      expect(newImage.height).toBe(newHeight);
      assertOtherProperties(newImage, image, ['height']);
    });

  });

  describe('Test for moveTo', () => {

    it('should return a new moved instance', () => {
      // Arrange
      const image = new Image(config);
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newImage = image.moveTo(pos);
      // Assert
      expect(image.x).toBe(config.x);
      expect(image.y).toBe(config.y);
      expect(newImage.x).toBe(pos.x);
      expect(newImage.y).toBe(pos.y);
      assertOtherProperties(newImage, image, ['x', 'y']);
    });

  });

  describe('Test for resize', () => {

    it('should return a resized instance', () => {
      // Arrange
      const image = new Image(config);
      const box: Box = { x: 11, y: 12, width: 13, height: 14 };
      // Act
      const newImage = image.resize(box);
      // Assert
      expect(image.x).toBe(config.x);
      expect(image.y).toBe(config.y);
      expect(image.width).toBe(config.width);
      expect(image.height).toBe(config.height);
      expect(newImage.x).toBe(box.x);
      expect(newImage.y).toBe(box.y);
      expect(newImage.width).toBe(box.width);
      assertOtherProperties(newImage, image, ['x', 'y', 'width', 'height']);
    });

  });

  describe('Test for equals', () => {

    it('should return true when two Image are same', () => {
      // Arrange
      const image1 = new Image(config);
      const image2 = new Image(config);
      // Act
      const result = image1.equals(image2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when two Image are different', () => {
      // Arrange
      const image1 = new Image(config);
      const image2 = new Image({ ...config, x: 11 });
      // Act
      const result = image1.equals(image2);
      // Assert
      expect(result).toBe(false);
    });

  });

  function assertOtherProperties(image1: Image, image2: Image, omitKeys: (keyof Image)[] = []) {
    const allKeys: (keyof Image)[] = [
      'x', 'y', 'width', 'height', 'src',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(image1[key]).toBe(image2[key]);
    });
  }

});
