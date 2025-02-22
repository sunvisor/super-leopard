/**
 * Test for SerializeBorder
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeBorder } from "./serializeBorder";
import { Border } from './Border';
import { Color } from './Color';


describe('Tests for serializeBorder', () => {

  it('should return serialized BorderData', () => {
    // Arrange
    const border = new Border({
      width: 1,
      color: new Color('#000000'),
      style: 'dotted',
      cap: 'round',
      join: 'bevel'
    });
    // Act
    const result = serializeBorder(border);
    // Assert
    expect(result).toEqual({
      width: 1,
      color: '#000000',
      style: 'dotted',
      cap: 'round',
      join: 'bevel'
    });
  });

  it('should set the default value for color when serializing an object with omitted color', () => {
    // Arrange
    const config = {
      color: new Color('#000000'),
    };
    const border = new Border(config);
    // Act
    const result = serializeBorder(border);
    // Assert
    expect(result).toEqual({
      color: '#000000',
    });
  });

  it('should set string value for color when serializing an object with RGB color', () => {
    // Arrange
    const border = new Border({
      width: 1,
      color: new Color({ r: 0, g: 0, b: 0 }),
    });
    // Act
    const result = serializeBorder(border);
    // Assert
    expect(result).toEqual({
      width: 1,
      color: '#000000',
    });

  });
});
