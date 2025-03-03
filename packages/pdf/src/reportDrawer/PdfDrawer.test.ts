/**
 * Test for PdfDrawer
 *
 * Created by sunvisor on 2025/02/21.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { PdfDrawer } from "./PdfDrawer";
import { describe } from 'vitest';
import {
  createAndRegisterTestFonts,
  getImagePath,
  mockDoc,
  mockMeasurement,
} from '../__test_assets__';
import { createScale, createShapes } from '@sunvisor/super-leopard-core';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


describe('Tests for PdfDrawer', () => {

  const scale = createScale({
    unit: 'mm',
  });
  const drawer = new PdfDrawer({
    doc: mockDoc,
    scale,
    getImagePath,
    fonts: createAndRegisterTestFonts(mockDoc),
    measurement: mockMeasurement,
  });

  describe('Tests for draw', () => {

    it('should draw shapes', () => {
      // Arrange
      const shapes = createShapes(shapeTestData);
      // Act
      drawer.draw(shapes);
      // Assert
      expect(mockDoc.circle).toBeCalledTimes(1);
    });

  });

  describe('Tests for open', () => {

    it('should open stream', () => {
      // Arrange
      const stream = {} as NodeJS.WritableStream;
      // Act
      drawer.open(stream);
      // Assert
      expect(mockDoc.open).toBeCalledWith(stream);
    });

  });

  describe('Tests for close', () => {

    it('should close stream', () => {
      // Act
      drawer.close();
      // Assert
      expect(mockDoc.close).toBeCalled();
    });

  });

});
