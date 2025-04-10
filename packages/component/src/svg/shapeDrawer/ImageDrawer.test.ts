/**
 * Test for ImageDrawer
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ImageDrawer } from "./ImageDrawer";
import { Scale, UnitType, createImage, ImageData } from '@sunvisor/super-leopard-core';
import { createTestSvgDrawer, testImageOptions } from '@/__test_assets__';

describe('Tests for ImageDrawer#draw', () => {
  const svg = createTestSvgDrawer();
  const scale = new Scale({ unit: UnitType.INCH });
  const drawer = new ImageDrawer({ svg, scale, imageOptions: testImageOptions });
  const data: ImageData = {
    type: 'image',
    x: 10,
    y: 10,
    src: 'sunvisorlab_icon.png',
    width: 40,
    height: 40,
  };

  it('should append a image element with correct attributes to the SVG', () => {
    // Arrange
    svg.clear();
    const image = createImage(data);
    // Act
    drawer.draw(image, {});
    // Assert
    expect(svg.find('image').length).toBe(1);
    const element = svg.find('image')[0];
    expect(element.attr('x')).toBe(scale.toPixel(10));
    expect(element.attr('y')).toBe(scale.toPixel(10));
    expect(element.attr('width')).toBe(scale.toPixel(40));
    expect(element.attr('height')).toBe(scale.toPixel(40));
    expect(element.attr('href')).toBe(testImageOptions.getImageUrl(data.src));
  });

  test('Draw with opacity', () => {
    // Arrange
    svg.clear();
    const image = createImage(data);
    // Act
    drawer.draw(image, { opacity: 0.5 });
    // Assert
    expect(svg.find('image').length).toBe(1);
    const element = svg.find('image')[0];
    expect(element.attr('opacity')).toBe(0.5);
  });

  it('should draw no image when src is empty', () => {
    // Arrange
    svg.clear();
    const image = createImage({ ...data, src: '' });
    // Act
    drawer.draw(image, {});
    // Assert
    expect(svg.find('image').length).toBe(1);
    const element = svg.find('image')[0];
    expect(element.attr('href')).toBe(testImageOptions.noImageUrl);
  });

});
