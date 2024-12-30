/**
 * Contractor
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { BorderPropertyValue, FillColorPropertyValue } from '../expander';
import { BorderData } from '../data';


export function contractBorder(borderProperty: BorderPropertyValue): BorderData | undefined {
  if (!borderProperty.useStroke) {
    return undefined;
  }
  return {
    style: borderProperty.borderStyle,
    width: borderProperty.borderWidth,
    color: borderProperty.borderColor,
    cap: borderProperty.borderCap,
    join: borderProperty.borderJoin,
  }
}

export function contractFillColor(fillColorProperty: FillColorPropertyValue): string | undefined {
  if (!fillColorProperty.useFillColor) {
    return undefined;
  }
  return fillColorProperty.fillColor;
}
