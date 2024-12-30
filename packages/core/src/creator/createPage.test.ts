/**
 * Test for CreatePage
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createPage } from "./createPage";
import { OrientationType, UnitType } from "../object";
import { PageData } from '../data';

describe('Test for createPage', () => {

  test('Create Page with paper size', () => {
    // Arrange
    const data: PageData = {
      size: 'A4',
      orientation: 'portrait',
      unit: UnitType.MILLIMETER,
    };
    // Act
    const page = createPage(data);
    // Assert
    expect(page.width).toBe(210);
    expect(page.height).toBe(297);
    expect(page.size).toBe('A4');
    expect(page.orientation).toBe(OrientationType.PORTRAIT);
    expect(page.unit).toBe(UnitType.MILLIMETER);
  });
});
