/**
 * Test for ImageType
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { isJPEGFile, isPngFile, isSVGFile } from "./imageType";

const assetsDir = `${__dirname}/../__test_assets__/images`;

describe('imageTypeのテスト', () => {

  describe('isJPEGFileのテスト', () => {

    test('jpegファイルを渡すとtrueを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/sample_jpeg.jpg`;
      // Act
      const result = isJPEGFile(filePath);
      // Assert
      expect(result).toBe(true);
    });

    test('pngファイルを渡すとfalseを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/sunvisorlab_icon.png`;
      // Act
      const result = isJPEGFile(filePath);
      // Assert
      expect(result).toBe(false);
    });

    test('SVGファイルを渡すとfalseを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/no_image.svg`;
      // Act
      const result = isJPEGFile(filePath);
      // Assert
      expect(result).toBe(false);
    });

  });

  describe('isPngFileのテスト', () => {

    test('pngファイルを渡すとtrueを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/sunvisorlab_icon.png`;
      // Act
      const result = isPngFile(filePath);
      // Assert
      expect(result).toBe(true);
    });

    test('jpegファイルを渡すとfalseを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/sample_jpeg.jpg`;
      // Act
      const result = isPngFile(filePath);
      // Assert
      expect(result).toBe(false);
    });

    test('SVGファイルを渡すとfalseを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/no_image.svg`;
      // Act
      const result = isPngFile(filePath);
      // Assert
      expect(result).toBe(false);
    });

  });

  describe('isSVGFileのテスト', () => {

    test('SVGファイルを渡すとtrueを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/no_image.svg`;
      // Act
      const result = isSVGFile(filePath);
      // Assert
      expect(result).toBe(true);
    });

    test('pngファイルを渡すとfalseを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/sunvisorlab_icon.png`;
      // Act
      const result = isSVGFile(filePath);
      // Assert
      expect(result).toBe(false);
    });

    test('jpegファイルを渡すとfalseを返す', () => {
      // Arrange
      const filePath = `${assetsDir}/sample_jpeg.jpg`;
      // Act
      const result = isSVGFile(filePath);
      // Assert
      expect(result).toBe(false);
    });

  })
});
