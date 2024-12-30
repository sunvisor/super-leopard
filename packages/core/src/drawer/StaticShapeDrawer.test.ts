/**
 * Test for StaticShapeDrawer
 *
 * Created by sunvisor on 2025/01/26.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { StaticShapeDrawer } from "./StaticShapeDrawer";
import { createCircle, createEllipse, createField, createImage, createLine, createRect, createText } from '../creator';
import { mockShapeDrawers } from '../__test_assets__/drawerTest';


describe('Tests for StaticShapeDrawer', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Tests for supported shapes', () => {

    test('Should call draw method of RectDrawer when shape type is rect', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const rect = createRect({
        type: 'rect',
        x: 10,
        y: 20,
        width: 30,
        height: 40,
        border: {
          width: 1,
          color: '#000000',
        }
      })
      // Act
      drawer.draw(rect, { opacity: 1 });
      // Assert
      expect(mockShapeDrawers.rect.draw).toHaveBeenCalledWith(rect, { opacity: 1 });
    });

    test('Should call draw method of LineDrawer when shape type is line', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const line = createLine({
        type: 'line',
        x1: 10,
        y1: 20,
        x2: 30,
        y2: 40,
        border: {
          width: 1,
          color: '#000000',
        }
      });
      // Act
      drawer.draw(line, { opacity: 1 });
      // Assert
      expect(mockShapeDrawers.line.draw).toHaveBeenCalledWith(line, { opacity: 1 });
    });

    test('Should call draw method of CircleDrawer when shape type is circle', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const circle = createCircle({
        type: 'circle',
        x: 10,
        y: 20,
        diameter: 30,
        border: {
          width: 1,
          color: '#000000',
        }
      });
      // Act
      drawer.draw(circle, { opacity: 1 });
      // Assert
      expect(mockShapeDrawers.circle.draw).toHaveBeenCalledWith(circle, { opacity: 1 });
    });

    test('Should call draw method of EllipseDrawer when shape type is ellipse', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const ellipse = createEllipse({
        type: 'ellipse',
        x: 10,
        y: 20,
        width: 30,
        height: 40,
        border: {
          width: 1,
          color: '#000000',
        }
      });
      // Act
      drawer.draw(ellipse, { opacity: 1 });
      // Assert
      expect(mockShapeDrawers.ellipse.draw).toHaveBeenCalledWith(ellipse, { opacity: 1 });
    });

    test('Should call draw method of TextDrawer when shape type is text', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const text = createText({
        type: 'text',
        x: 10,
        y: 20,
        height: 6,
        width: 200,
        text: 'Hello, World!',
        font: {
          family: 'Helvetica',
          size: 12
        },
      });
      // Act
      drawer.draw(text, { opacity: 1 });
      // Assert
      expect(mockShapeDrawers.text.draw).toHaveBeenCalledWith(text, { opacity: 1 });
    });

    test('Should call draw method of ImageDrawer when shape type is image', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const image = createImage({
        src: 'foo.png',
        type: 'image',
        x: 10,
        y: 20,
        width: 30,
        height: 40
      });
      // Act
      drawer.draw(image, { opacity: 1 });
      // Assert
      expect(mockShapeDrawers.image.draw).toHaveBeenCalledWith(image, { opacity: 1 });
    });

  });

  describe('Tests for unsupported shapes', () => {

    test('Should throw error when shape type is unsupported', () => {
      // Arrange
      const drawer = new StaticShapeDrawer(mockShapeDrawers);
      const field = createField({
        name: 'field1',
        shape: {
          type: 'text',
          x: 10,
          y: 20,
          height: 6,
          width: 200,
          font: {
            family: 'Helvetica',
            size: 12
          },
        },
        type: 'field'
      });
      // Act
      // Assert
      expect(() => drawer.draw(field, { opacity: 1 })).toThrow('Unsupported shape: field');
    });

  });

});
