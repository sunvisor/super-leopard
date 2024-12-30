/**
 * Test for CreateSvgDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createPdfDrawer } from "./createPdfDrawer";
import { createPage, createScale, UnitType } from '@sunvisor/super-leopard-core';
import PdfDocument from 'pdfkit';
import { createAndRegisterTestFonts, drawTexts } from '../__test_assets__';
import { expect } from 'vitest';
import { PdfDrawer } from './PdfDrawer';

describe('Tests for createSvgDrawer', () => {

  it('should return data drawer', () => {
    // Arrange
    const doc = new PdfDocument()
    const getImagePath = vi.fn();
    const fonts = createAndRegisterTestFonts(doc);
    const page = createPage({ size: 'A4', unit: UnitType.MILLIMETER });
    // Act
    const drawer = createPdfDrawer({
      page,
      fonts,
      getImagePath,
    });
    // Assert
    expect(drawer).toBeDefined();
    expect(drawer).toBeInstanceOf(PdfDrawer);
  });

});
