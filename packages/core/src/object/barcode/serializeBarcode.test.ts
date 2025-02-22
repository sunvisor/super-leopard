/**
 * Test for SerializeBarcode
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { serializeBarcode } from "./serializeBarcode";
import { Barcode } from './Barcode';
import { BarcodeShape } from '../shape';


describe('Tests for serializeBarcode', () => {

  it('should return serialized BarcodeData', () => {
    // Arrange
    const barcode = new Barcode({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      format: 'code128',
      value: '1234567890',
      options: {
        rotate: 'N',
        includeText: false,
      }
    })
    // Act
    const result = serializeBarcode(barcode);
    // Assert
    expect(result).toEqual({
      type: BarcodeShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      format: 'code128',
      value: '1234567890',
      options: {
        rotate: 'N',
        includeText: false,
      }
    });
  })

});
