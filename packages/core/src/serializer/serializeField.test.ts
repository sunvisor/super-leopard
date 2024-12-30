/**
 * Test for SerializeField
 *
 * Created by sunvisor on 2023/12/06.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeField } from "./serializeShape";
import { TextShape } from '../object';
import { createField } from '../creator';
import { FieldData, TextData } from '../data';

describe('Test for serializeField', () => {

  test('Should return serialized FieldData', () => {
    // Arrange
    const data: FieldData<TextData> = {
      type: 'field',
      name: 'myField',
      shape: {
        type: TextShape,
        x: 1,
        y: 2,
        width: 100,
        height: 7,
        font: {
          family: 'serif',
          size: 12
        },
      }
    }
    const field = createField(data);
    // Act
    const result = serializeField(field) as FieldData<TextData>;
    // Assert
    expect(result.name).toEqual(data.name);
    expect(result.type).toEqual(data.type);
    expect(result.shape.x).toEqual(data.shape.x);
    expect(result.shape.y).toEqual(data.shape.y);
    expect(result.shape.text).toBe(data.shape.text);
    expect(result.shape.font.family).toEqual(data.shape.font.family);
    expect(result.shape.font.size).toEqual(data.shape.font.size);
  });

});
