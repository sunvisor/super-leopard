/**
 * Test for Scale
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Scale, DPPX, UnitType, PointParInch } from "./Scale";
import { describe } from 'vitest';

describe('Tests for Scale', () => {

  describe('Tests for creation', () => {

    test('Creating Scale instance with all parameters', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 2;
      const pointPrecision = 3;
      // Act
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Assert
      expect(scale.unit).toBe(unit);
      expect(scale.zoom).toBe(zoom);
      expect(scale.precision).toBe(precision);
      expect(scale.pointPrecision).toBe(pointPrecision);
    });

    test('unit can be omitted and default value is millimeter', () => {
      // Arrange
      const data = {}
      // Act
      const scale = new Scale(data);
      // Assert
      expect(scale.unit).toBe(UnitType.MILLIMETER);
    });

    test('default value of precision should be 2 when unit is inch', () => {
      // Arrange
      const data = { unit: UnitType.INCH }
      // Act
      const scale = new Scale(data);
      // Assert
      expect(scale.fromPixel(333.333333)).toBe(3.47);
    });

    test('default value of precision should be 1 when unit is millimeter', () => {
      // Arrange
      const data = { unit: UnitType.MILLIMETER }
      // Act
      const scale = new Scale(data);
      // Assert
      expect(scale.fromPixel(333.333333)).toBe(88.2);
    });

    test('pointPrecision can be omitted and default value is 2', () => {
      // Arrange
      const data = { unit: UnitType.MILLIMETER }
      // Act
      const scale = new Scale(data);
      // Assert
      expect(scale.pointPrecision).toBe(2);
    });
  });

  describe('Tests for toPixel', () => {
    const unit = UnitType.INCH;
    const zoom = 1;
    const precision = 0;
    const pointPrecision = 2;

    it('should return pixel value when unit is inch', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPixel(20);
      // Assert
      expect(pixel).toBe(1920);
    });

    it('should return (pixel * zoom) when zoom is set', () => {
      // Arrange
      const scale = new Scale({ unit, zoom: 2, precision, pointPrecision });
      // Act
      const pixel = scale.toPixel(1);
      // Assert
      expect(pixel).toBe(2 * DPPX);
    });

    it('should return pixel value when unit is millimeter', () => {
      // Arrange
      const unit = UnitType.MILLIMETER;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPixel(1);
      // Assert
      expect(pixel).toBe(DPPX / 25.4);
    });

    it('should return pixel Box value when parameter is Box', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPixel({ x: 1, y: 2, width: 3, height: 4 });
      // Assert
      expect(pixel).toStrictEqual({ x: DPPX, y: 2 * DPPX, width: 3 * DPPX, height: 4 * DPPX });
    });

    it('should return pixel Position value when parameter is Position', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPixel({ x: 1, y: 2 });
      // Assert
      expect(pixel).toStrictEqual({ x: DPPX, y: 2 * DPPX });
    });

    it('should return pixel PositionPair value when parameter is PositionPair', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPixel({ x1: 1, y1: 2, x2: 3, y2: 4 });
      // Assert
      expect(pixel).toStrictEqual({ x1: DPPX, y1: 2 * DPPX, x2: 3 * DPPX, y2: 4 * DPPX });
    });

    it('should add margin to x,y when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPixel({ x: 10, y: 20 });
      // Assert
      expect(pixel).toStrictEqual(
        { x: 11 * DPPX, y: 22 * DPPX }
      );
    });

    it('should be added to x,y when margin is set', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPixel({ x: 10, y: 20, width: 30, height: 40 });
      // Assert
      expect(pixel).toStrictEqual(
        { x: 11 * DPPX, y: 22 * DPPX, width: 30 * DPPX, height: 40 * DPPX }
      );
    });

    it('should be added to the x1, y1, x2, y2 when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPixel({ x1: 10, y1: 20, x2: 30, y2: 40 });
      // Assert
      expect(pixel).toStrictEqual(
        { x1: 11 * DPPX, y1: 22 * DPPX, x2: 31 * DPPX, y2: 42 * DPPX }
      );
    });

    test('margin should not be added even if margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPixel(1);
      // Assert
      expect(pixel).toBe(DPPX);
    });

  });

  describe('Test for fromPixel', () => {
    const unit = UnitType.INCH;
    const zoom = 1;
    const precision = 2;
    const pointPrecision = 2;

    it('should return inch value', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPixel(DPPX);
      // Assert
      expect(value).toBe(1);
    });

    it('should return rounded value', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPixel(100);
      // Assert
      expect(value).toBe(1.04); // rounded
    });

    it('should return mm value', () => {
      // Arrange
      const scale = new Scale({ unit: UnitType.MILLIMETER, zoom, pointPrecision });
      // Act
      const value = scale.fromPixel(100);
      // Assert
      expect(value).toBe(26.5); // default precision for mm is 1
    });

    it('should return (unit value / zoom) when zoom is set', () => {
      // Arrange
      const scale = new Scale({ unit, zoom: 2, precision, pointPrecision });
      // Act
      const value = scale.fromPixel(DPPX * 2);
      // Assert
      expect(value).toBe(1);
    });

    it('should return Box value when parameter is Box', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPixel({ x: DPPX, y: 2 * DPPX, width: 3 * DPPX, height: 4 * DPPX });
      // Assert
      expect(value).toStrictEqual({ x: 1, y: 2, width: 3, height: 4 });
    });

    it('should return Position value when parameter is Position', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPixel({ x: DPPX, y: 2 * DPPX });
      // Assert
      expect(value).toStrictEqual({ x: 1, y: 2 });
    });

    it('should return PositionPair value when parameter is PositionPair', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPixel({ x1: DPPX, y1: 2 * DPPX, x2: 3 * DPPX, y2: 4 * DPPX });
      // Assert
      expect(value).toStrictEqual({ x1: 1, y1: 2, x2: 3, y2: 4 });
    });

    it('should be subtracted from the x,y when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const value = scale.fromPixel({ x: 11 * DPPX, y: 22 * DPPX });
      // Assert
      expect(value).toStrictEqual({ x: 10, y: 20 });
    });

    it('should be subtracted from the x,y when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const value = scale.fromPixel({ x: 11 * DPPX, y: 22 * DPPX, width: 30 * DPPX, height: 40 * DPPX });
      // Assert
      expect(value).toStrictEqual({ x: 10, y: 20, width: 30, height: 40 });
    });

    it('should be subtracted from the x1,y1,x2,y2 when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const value = scale.fromPixel({ x1: 11 * DPPX, y1: 22 * DPPX, x2: 31 * DPPX, y2: 42 * DPPX });
      // Assert
      expect(value).toStrictEqual({ x1: 10, y1: 20, x2: 30, y2: 40 });
    });

  });

  describe('Tests for toPoint', () => {
    const unit = UnitType.INCH;
    const zoom = 1;
    const precision = 0;
    const pointPrecision = 2;

    it('should return point value when unit is inch', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPoint(1);
      // Assert
      expect(pixel).toBe(PointParInch);
    });

    it('should return point value when unit is millimeter', () => {
      // Arrange
      const unit = UnitType.MILLIMETER;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPoint(100);
      // Assert
      expect(pixel).toBe(283.46); // rounded by pointPrecision
    });

    it('should return rounded point value', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPoint(1);
      // Assert
      expect(pixel).toBe(PointParInch);
    });

    it('should return Box value when parameter is Box', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPoint({ x: 1, y: 2, width: 3, height: 4 });
      // Assert
      expect(pixel).toStrictEqual({
        x: PointParInch,
        y: 2 * PointParInch,
        width: 3 * PointParInch,
        height: 4 * PointParInch
      });
    });

    it('should return Position value when parameter is Position', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPoint({ x: 1, y: 2 });
      // Assert
      expect(pixel).toStrictEqual({ x: PointParInch, y: 2 * PointParInch });
    });

    it('should return PositionPair value when parameter is PositionPair', () => {
      // Arrange
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.toPoint({ x1: 1, y1: 2, x2: 3, y2: 4 });
      // Assert
      expect(pixel).toStrictEqual({
        x1: PointParInch,
        y1: 2 * PointParInch,
        x2: 3 * PointParInch,
        y2: 4 * PointParInch
      });
    });

    test('margin should be added to the x,y coordinates of specified Point when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPoint({ x: 10, y: 20 });
      // Assert
      expect(pixel).toStrictEqual(
        { x: 11 * PointParInch, y: 22 * PointParInch }
      );
    });

    test('margin should be added to the x,y coordinates of specified Box when margin is set', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPoint({ x: 10, y: 20, width: 30, height: 40 });
      // Assert
      expect(pixel).toStrictEqual(
        { x: 11 * PointParInch, y: 22 * PointParInch, width: 30 * PointParInch, height: 40 * PointParInch }
      );
    });

    test('margin should be added to the x,y coordinates of specified PositionPair when margin is set', () => {
      // Arrange
      const scale = new Scale({
          unit, zoom, precision, pointPrecision,
        },
        { left: 1, top: 2 },
      );
      // Act
      const pixel = scale.toPoint({ x1: 10, y1: 20, x2: 30, y2: 40 });
      // Assert
      expect(pixel).toStrictEqual(
        { x1: 11 * PointParInch, y1: 22 * PointParInch, x2: 31 * PointParInch, y2: 42 * PointParInch }
      );
    });

  });

  describe('Tests for fromPoint', () => {

    it('should return inch value when unit is inch', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPoint(PointParInch);
      // Assert
      expect(value).toBe(1);
    });

    it('should return mm value when unit is millimeter', () => {
      // Arrange
      const unit = UnitType.MILLIMETER;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPoint(283.46);
      // Assert
      expect(value).toBeCloseTo(100, 0);
    });

    it('should return not rounded unit value', () => {
      // Arrange
      const unit = UnitType.MILLIMETER;
      const zoom = 1;
      const precision = 1;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.fromPoint(100);
      // Assert
      expect(value).toBeCloseTo(35.3, 1);
    });

  });

  describe('Tests for pointToPixel', () => {

    it('should return pixel value', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const pixel = scale.pointToPixel(10);
      // Assert
      expect(pixel).toBe(96 / 72 * 10);
    });

  });

  describe('Tests for pointFromPixel', () => {

    it('should return point value', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 2;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.pointFromPixel(96 / 72 * 10);
      // Assert
      expect(value).toBe(10);
    });

    it('should return rounded point value', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 2;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.pointFromPixel(13.3);
      // Assert
      expect(value).toBe(9.98); // rounded
    });

  });

  describe('Tests for round', () => {

    it('should return rounded value', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const value = scale.round(1.33333333, 2);
      // Assert
      expect(value).toBe(1.33);
    });

  });

  describe('Test for setZoom', () => {

    it('should set zoom', () => {
      // Arrange
      const unit = UnitType.INCH;
      const zoom = 1;
      const precision = 0;
      const pointPrecision = 2;
      const scale = new Scale({ unit, zoom, precision, pointPrecision });
      // Act
      const newScale = scale.setZoom(2);
      // Assert
      expect(newScale.zoom).toBe(2);
    });

  });

});
