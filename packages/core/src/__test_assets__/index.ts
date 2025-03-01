import { shapeTestData } from '@sunvisor/super-leopard-test-assets/src';
import { createShape } from '../creator';

export * from './testList';
export * as en from './en/testBill';

export function createTestShapes(data = shapeTestData) {
  return data.map(item => createShape(item));
}
