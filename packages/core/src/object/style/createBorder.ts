/**
 * CreateBorder
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Border } from "./Border";
import { Color, DEFAULT_COLOR } from "./Color";
import { BorderData } from '../../data';


export function createBorder(data: BorderData): Border;
export function createBorder(data: undefined): undefined;
export function createBorder(data: BorderData | undefined): Border | undefined;
export function createBorder(data: BorderData | undefined): Border | undefined {
  if (!data) {
    return undefined;
  }
  const { color, ...rest } = data;
  const config = {
    color: new Color(color ?? DEFAULT_COLOR),
    ...rest
  }

  return new Border(config);
}
