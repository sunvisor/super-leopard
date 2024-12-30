/**
 * Test for CreateField
 *
 * Created by sunvisor on 2023/12/06.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Field, Line, Text } from "../object";
import { createField } from './createShape';
import { FieldData, LineData, TextData } from '../data';

describe('Tests for createField', () => {

  test('Create Text Field', () => {
    // Arrange
    const data: FieldData<TextData> = {
      name: 'myField',
      type: 'field',
      shape: {
        type: 'text',
        x: 1,
        y: 2,
        width: 100,
        height: 7,
        font: {
          family: 'serif',
          size: 12
        }
      }
    };
    // Act
    const field = createField(data);
    // Assert
    expect(field).toBeInstanceOf(Field);
    expect(field.name).toBe(data.name);
    expect(field.type).toBe(data.type);
    const text = field.shape as Text;
    expect(text.x).toBe(data.shape.x);
    expect(text.y).toBe(data.shape.y);
    expect(text.font.family).toBe(data.shape.font.family);
    expect(text.font.size).toBe(data.shape.font.size);
  });

  test('Create Line Field', () => {
    // Arrange
    const data: FieldData<LineData> = {
      name: 'myField',
      type: 'field',
      shape: {
        type: 'line',
        x1: 1,
        y1: 2,
        x2: 3,
        y2: 4
      }
    };
    // Act
    const field = createField(data);
    // Assert
    expect(field).toBeInstanceOf(Field);
    expect(field.name).toBe(data.name);
    expect(field.type).toBe(data.type);
    const line = field.shape as Line;
    expect(line.x1).toBe(data.shape.x1);
    expect(line.y1).toBe(data.shape.y1);
    expect(line.x2).toBe(data.shape.x2);
    expect(line.y2).toBe(data.shape.y2);
  });

});
