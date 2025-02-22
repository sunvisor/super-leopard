/**
 * Test for SerializePage
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializePage } from "./serializePage";
import { createPage } from "./createPage";
import { PageData } from "../../data";
import { UnitType } from '../scale';


describe('Tests for serializePage', () => {

  it('should return serialized PageData', () => {
    // Arrange
    const data: PageData = {
      size: 'A4',
      unit: UnitType.MILLIMETER,
      orientation: 'portrait'
    };
    const page = createPage(data);
    // Act
    const pageData = serializePage(page);
    // Assert
    expect(pageData).toEqual({
      ...data,
    });
  });

  test('Serialized data should not include orientation when orientation is not specified', () => {
    // Arrange
    const data: PageData = {
      size: 'A4',
      unit: UnitType.MILLIMETER,
    };
    const page = createPage(data);
    // Act
    const pageData = serializePage(page);
    // Assert
    expect(pageData).toEqual({
      ...data,
    });
  });

  it('should return serialized PageData from Page with custom size', () => {
    // Arrange
    const data: PageData = {
      size: { width: 100, height: 200 },
      unit: UnitType.MILLIMETER,
      orientation: 'portrait'
    };
    const page = createPage(data);
    // Act
    const pageData = serializePage(page);
    // Assert
    expect(pageData).toEqual({
      ...data,
    });
  });

  it('should return serialized PageData from Page with inch unit', () => {
    // Arrange
    const data: PageData = {
      size: 'A4',
      orientation: 'portrait',
      unit: UnitType.INCH,
    };
    const page = createPage(data);
    // Act
    const pageData = serializePage(page);
    // Assert
    expect(pageData).toEqual(data);
  });

});
