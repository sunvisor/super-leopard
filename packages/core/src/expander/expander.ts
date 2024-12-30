import { Border, CapValue, Color, JoinValue, StyleValue } from '../object';

export type BorderPropertyValue = {
  useStroke: boolean;
  borderStyle?: StyleValue;
  borderWidth?: number;
  borderColor?: string;
  borderCap?: CapValue;
  borderJoin?: JoinValue;
}

export type FillColorPropertyValue = {
  useFillColor: boolean;
  fillColor?: string;
}

export function expandBorder(border: Border | undefined): BorderPropertyValue {
  return {
    useStroke: border !== undefined,
    borderStyle: border?.style,
    borderWidth: border?.width,
    borderColor: border?.color.color,
    borderCap: border?.cap,
    borderJoin: border?.join,
  }
}

export function expandFillColor(color: Color | undefined): FillColorPropertyValue {
  return {
    useFillColor: color !== undefined,
    fillColor: color?.color,
  }
}
