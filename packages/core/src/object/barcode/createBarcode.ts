/**
 * CreateBarcode
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Barcode, BarcodeConfig } from './Barcode';
import { BarcodeShape } from '../shape';
import { BarcodeData, sampleBarcodeValues } from '../../data';


export function createBarcode(data: BarcodeData) {
  const { type, value, ...rest } = data;
  if (type && type !== BarcodeShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  const config: BarcodeConfig = {
    value: value ?? sampleBarcodeValues[data.format],
    ...rest
  }
  return new Barcode(config);
}
