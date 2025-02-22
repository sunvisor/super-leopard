/**
 * Test for Precision
 *
 * Created by sunvisor on 2024/02/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { internalValue, externalValue } from "./precision";

describe('Tests for precision', () => {

  describe('Tests for internalValue', () => {

    it('should return a value shifted 3 decimal places to the right', () => {
      const value = 123.456;
      const result = internalValue(value);
      expect(result).toBe(123456);
    });

    it('should round fractional values to the nearest integer', () => {
      const value = 123.4567;
      const result = internalValue(value);
      expect(result).toBe(123457);
    });

  });

  describe('Test for externalValue', () => {

    it('should return a value shifted 3 decimal places to the left', () => {
      const value = 123456;
      const result = externalValue(value);
      expect(result).toBe(123.456);
    });

  })
});
