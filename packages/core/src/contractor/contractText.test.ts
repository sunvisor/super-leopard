/**
 * Test for ContractText
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractText } from "./contractText";
import { TextPropertyValue } from '../expander';
import { Text } from '../object';

describe('Tests for contractText', () => {

  test('Should return Text', () => {
    // Arrange
    const propertyValue: TextPropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      text: 'test',
      useFillColor: true,
      fillColor: '#FF0000',
      fontFamily: 'sans-serif',
      fontSize: 12,
      fontStyle: ['bold', 'italic'],
      color: '#000000',
      align: 'left',
      valign: 'middle',
      fitCell: false,
      multiLine: true,
      linePitch: 7,
    }
    // Act
    const text = contractText(propertyValue);
    // Assert
    expect(text).toBeInstanceOf(Text);
    expect(text.x).toBe(0);
    expect(text.y).toBe(0);
    expect(text.width).toBe(100);
    expect(text.height).toBe(100);
    expect(text.text).toBe('test');
    expect(text.fillColor?.color).toBe('#FF0000');
    expect(text.font.family).toBe('sans-serif');
    expect(text.font.size).toBe(12);
    expect(text.font.style).toEqual(
      expect.arrayContaining(['bold', 'italic'])
    );
    expect(text.color?.color).toBe('#000000');
    expect(text.align).toBe('left');
    expect(text.valign).toBe('middle');
    expect(text.fitCell).toBe(false);
    expect(text.multiLine).toBe(true);
    expect(text.linePitch).toBe(7);
  });

  test('Should ignore linePitch when multiLine is false', () => {
    // Arrange
    const propertyValue: TextPropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      text: 'test',
      useFillColor: true,
      fillColor: '#FF0000',
      fontFamily: 'sans-serif',
      fontSize: 12,
      fontStyle: ['bold', 'italic'],
      color: '#000000',
      align: 'left',
      valign: 'middle',
      fitCell: false,
      multiLine: false,
      linePitch: 7,
    }
    // Act
    const text = contractText(propertyValue);
    // Assert
    expect(text.linePitch).toBeUndefined();
  })
});
