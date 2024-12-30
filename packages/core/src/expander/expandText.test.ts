/**
 * Test for ExpandText
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandText } from "./expandText";
import { createText } from '../creator';
import { TextShape } from '../object';

describe('Test for expandText', () => {
  test('Should expand text to TextPropertyValue', () => {
    // Arrange
    const text = createText({
      type: TextShape,
      text: 'text',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      font: {
        family: 'sans-serif',
        size: 12,
        style: 'bold',
      },
      color: '#000000',
      fillColor: '#FF0000',
      align: 'left',
      valign: 'middle',
      multiLine: true,
      linePitch: 7,
      fitCell: false,
    });
    // Act
    const expandedText = expandText(text);
    // Assert
    expect(expandedText).toEqual({
      text: 'text',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      color: '#000000',
      useFillColor: true,
      fillColor: '#FF0000',
      fontFamily: 'sans-serif',
      fontSize: 12,
      fontStyle: ['bold'],
      align: 'left',
      valign: 'middle',
      multiLine: true,
      linePitch: 7,
      fitCell: false,
    });
  });
});
