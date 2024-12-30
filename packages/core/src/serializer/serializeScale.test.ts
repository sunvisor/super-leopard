/**
 * Test for SerializeScale
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeScale } from "./serializeScale";
import { Scale, UnitType } from "../object";

describe('Tests for serializeScale', () => {

  test('Should return serialized ScaleData', () => {
    // Arrange
    const scale = new Scale({
      unit: UnitType.INCH,
      zoom: 1,
      precision: 2,
      pointPrecision: 3
    });
    // Act
    const scaleData = serializeScale(scale);
    // Assert
    expect(scaleData).toEqual({
      unit: UnitType.INCH,
      zoom: 1,
      precision: 2,
      pointPrecision: 3
    });
  });

  test('Should return an empty object when serializing a Scale with all properties omitted', () => {
    // Arrange
    const scale = new Scale({});
    // Act
    const scaleData = serializeScale(scale);
    // Assert
    expect(scaleData).toEqual({});
  });

  test('Serialize Scale with only the unit property', () => {
    // Arrange
    const scale = new Scale({
      unit: UnitType.INCH
    });
    // Act
    const scaleData = serializeScale(scale);
    // Assert
    expect(scaleData).toEqual({
      unit: UnitType.INCH
    });
  });

});
