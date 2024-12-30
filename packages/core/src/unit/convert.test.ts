/**
 * Test for Convert
 *
 * Created by sunvisor on 2024/03/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { convertUnit } from "./convert";

describe('Tests for convertUnit', () => {

  test('Should return same value if units are the same', () => {
    expect(convertUnit(1, 'mm', 'mm')).toBe(1);
    expect(convertUnit(1, 'in', 'in')).toBe(1);
    expect(convertUnit(1, 'pt', 'pt')).toBe(1);
  });

  test('Should return converted value', () => {
    expect(convertUnit(25.4, 'mm', 'in')).toBe(1);
    expect(convertUnit(1, 'in', 'pt')).toBe(72);
    expect(convertUnit(72, 'pt', 'mm')).toBe(25.4);
  });

  test('Should throw error for invalid units', () => {
    expect(() => convertUnit(1, 'cm', 'mm')).toThrow('Invalid units provided.');
    expect(() => convertUnit(1, 'in', 'cm')).toThrow('Invalid units provided.');
  });

});
