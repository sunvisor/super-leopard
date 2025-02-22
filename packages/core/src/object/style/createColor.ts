/**
 * CreateColor
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Color } from "./Color";
import { ColorData } from '../../data';


export function createColor(data: ColorData): Color;
export function createColor(data: undefined): undefined;
export function createColor(data: ColorData | undefined): Color | undefined;
export function createColor(data: ColorData | undefined): Color | undefined {
  if (!data) return undefined;
  return new Color(data);
}
