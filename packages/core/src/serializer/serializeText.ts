/**
 * SerializeText
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Text } from "../object";
import { TextData } from "../data";
import { serializeFont } from './serializeFont';
import { serializeColor } from './serializeColor';

export function serializeText(text: Text): TextData {
  // const { text: textValue , multiLine, fitCell} = text.config;
  const { font, color, fillColor, ...rest } = text.config;
  const result: TextData = {
    type: text.type,
    font: serializeFont(text.font),
    color: serializeColor(text.color),
    ...rest,
  };
  if (fillColor !== undefined) {
    result.fillColor = serializeColor(fillColor);
  }

  return result;
}
