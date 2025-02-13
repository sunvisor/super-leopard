/**
 * Test for Utils
 *
 * Created by sunvisor on 2025/02/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { borderToStroke } from "./utils";
import { Scale } from '@sunvisor/super-leopard-core';
import { createBorder } from '@sunvisor/super-leopard-core';

describe('Tests for utils', () => {


  describe('Tests for borderToStroke', () => {

    it('should return undefined when border is undefined', () => {
      // Act
      const scale = {
        pointToPixel: (value: number) => value
      } as Scale;
      const stroke = borderToStroke(scale, undefined);
      // Assert
      expect(stroke).toBeUndefined();
    });

    it('should return stroke options when border is defined', () => {
      // Act
      const scale = {
        pointToPixel: (value: number) => value * 2
      } as Scale;
      const border = createBorder({
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'round',
        join: 'round'
      });
      const stroke = borderToStroke(scale, border);
      // Assert
      expect(stroke).toEqual({
        style: 'solid',
        color: '#ff0000',
        width: 2, // scaled
        cap: 'round',
        join: 'round',
      });

    });

  });

});
