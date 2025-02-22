/**
 * SerializeBarcode
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeData } from '../../data';
import { Barcode } from './Barcode';


export function serializeBarcode(barcode: Barcode): BarcodeData {
  return { 'type': 'barcode', ...barcode.config };
}
