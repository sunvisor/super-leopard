/**
 * Test for SerializeText
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeText } from "./serializeText";
import { createText } from "./createText";
import { TextShape } from '../shape';
import { DEFAULT_COLOR } from '../style';


describe('Test for serializeText', () => {

  it('should return serialized TextData', () => {
    // Arrange
    const data = {
      type: TextShape,
      x: 1,
      y: 2,
      width: 100,
      height: 7,
      font: {
        family: 'serif',
        size: 12
      }
    };
    const text = createText(data);
    // Act
    const serialized = serializeText(text);
    // Assert
    expect(serialized).toEqual({
      ...data,
      color: DEFAULT_COLOR,
    });
  });

  test('Serialize a Text object with full options', () => {
    // Arrange
    const data = {
      type: TextShape,
      x: 1,
      y: 2,
      text: 'text',
      font: {
        family: 'serif',
        size: 12
      },
      color: '#000000',
      width: 100,
      height: 20,
      align: 'center',
      valign: 'middle',
      multiLine: true,
      fitCell: true
    }
    const text = createText(data);
    // Act
    const serialized = serializeText(text);
    // Assert
    expect(serialized).toEqual(data);
  });

});
