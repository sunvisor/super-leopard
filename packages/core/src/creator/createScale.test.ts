/**
 * Test for CreateScale
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createScale } from "./createScale";
import { DPPX, UnitType } from "../object";

describe('Tests for createScale', () => {

  test('Create Scale with string parameter', () => {
    // Arrange
    const data = UnitType.MILLIMETER;
    // Act
    const scale = createScale(data);
    // Assert
    expect(scale.toPixel(1)).toBe(DPPX / 25.4);
    expect(scale.zoom).toBe(1);
  });

  test('Create Scale with object parameter', () => {
    // Arrange
    const data = {unit: UnitType.MILLIMETER}
    // Act
    const scale = createScale(data);
    // Assert
    expect(scale.toPixel(1)).toBe(DPPX / 25.4);
    expect(scale.zoom).toBe(1);
  });

  test('Create inch scale', () => {
    // Arrange
    const unit = UnitType.INCH;
    const zoom = 1;
    const precision = 0;
    const pointPrecision = 2;
    // Act
    const scale = createScale({unit, zoom, precision, pointPrecision});
    // Assert
    expect(scale.toPixel(1)).toBe(DPPX);
  });

  test('Create mm scale', () => {
    // Arrange
    const unit = UnitType.MILLIMETER;
    const zoom = 1;
    const precision = 0;
    const pointPrecision = 2;
    // Act
    const scale = createScale({unit, zoom, precision, pointPrecision});
    // Assert
    expect(scale.toPixel(1)).toBe(DPPX / 25.4);
  });

});
