/**
 * Test for Contractor
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractFillColor, contractBorder } from "./contractor";
import { BorderPropertyValue, FillColorPropertyValue } from '../expander';

describe('Tests for contractor', () => {

  describe('Tests for contractFillColor', () => {

    test('Should return string color when useFillColor is true', () => {
      // Arrange
      const propertyValue: FillColorPropertyValue = {
        useFillColor: true,
        fillColor: '#FF0000',
      }
      // Act
      const fillColor = contractFillColor(propertyValue);
      // Assert
      expect(fillColor).toBe('#FF0000');
    })

    test('Should return undefined when useFillColor is false', () => {
      // Arrange
      const propertyValue: FillColorPropertyValue = {
        useFillColor: false,
        fillColor: '#FF0000',
      }
      // Act
      const fillColor = contractFillColor(propertyValue);
      // Assert
      expect(fillColor).toBeUndefined();
    });

  });

  describe('Tests for contractBorder', () => {

    test('Should return border object when useStroke is true', () => {
      // Arrange
      const propertyValue: BorderPropertyValue = {
        useStroke: true,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FF0000',
        borderCap: 'butt',
        borderJoin: 'miter',
      }
      // Act
      const border = contractBorder(propertyValue);
      // Assert
      expect(border).toEqual({
        style: 'solid',
        width: 1,
        color: '#FF0000',
        cap: 'butt',
        join: 'miter',
      });
    });

    test('Should return undefined when useStroke is false', () => {
      // Arrange
      const propertyValue: BorderPropertyValue = {
        useStroke: false,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FF0000',
        borderCap: 'butt',
        borderJoin: 'miter',
      }
      // Act
      const border = contractBorder(propertyValue);
      // Assert
      expect(border).toBeUndefined();
    });

  });
});
