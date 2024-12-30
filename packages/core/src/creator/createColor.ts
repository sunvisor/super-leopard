import { Color } from "../object";
import { ColorData } from '../data';

/**
 * CreateColor
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function createColor(data: ColorData): Color;
export function createColor(data: undefined): undefined;
export function createColor(data: ColorData | undefined): Color | undefined;
export function createColor(data: ColorData | undefined): Color | undefined {
  if (!data) return undefined;
  return new Color(data);
}
