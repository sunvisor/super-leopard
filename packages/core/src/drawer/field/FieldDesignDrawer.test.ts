/**
 * Test for FieldDesignDrawer
 *
 * Created by sunvisor on 2025/01/28.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { FieldDesignDrawer } from "./FieldDesignDrawer";
import { createField } from '../../creator';
import { Rect, Text } from '../../object';
import { expect } from 'vitest';
import { rectFieldData, textFieldData } from '../../__test_assets__/drawerTest';

describe('Tests for FieldDesignDrawer', () => {

  const mockShapeDrawer = {
    draw: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Should draw bounding box with specified color', () => {
    // Arrange
    const borderColor = '#8888ff';
    const field = createField(textFieldData);
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[0];
    expect((result[0] as Rect).border.color.color).toBe(borderColor);
  });

  test('Should draw text with field name when field shape is text', () => {
    // Arrange
    const borderColor = '#8888ff';
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    const field = createField(textFieldData);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[1];
    expect((result[0] as Text).text).toBe(field.name);
  });

  test('Should draw shape when field shape is not text', () => {
    // Arrange
    const borderColor = '#8888ff';
    const drawer = new FieldDesignDrawer(mockShapeDrawer, borderColor);
    const field = createField(rectFieldData);
    // Act
    drawer.draw(field, { opacity: 1 });
    // Assert
    const result = mockShapeDrawer.draw.mock.calls[1];
    expect((result[0] as Rect).equals(field.shape)).toBe(true);
  });

});
