/**
 * Test for ContractLine
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractLine } from "./contractLine";
import { LinePropertyValue } from '../expander';
import { Line } from '../object';

describe('Test for contractLine', () => {

  test('Should return Line', () => {
    // Arrange
    const propertyValue: LinePropertyValue = {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const line = contractLine(propertyValue);
    // Assert
    expect(line).toBeInstanceOf(Line);
    expect(line.x1).toBe(0);
    expect(line.y1).toBe(0);
    expect(line.x2).toBe(100);
    expect(line.y2).toBe(100);
  });

});
