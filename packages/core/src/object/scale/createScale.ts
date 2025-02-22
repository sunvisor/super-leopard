/**
 * CreateScale
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Scale } from './Scale';
import { PageMargin } from '../../value';
import { ScaleData } from '../../data';


export function createScale(data: ScaleData, margin?: PageMargin): Scale {
  const config = typeof data === "string" ? { unit: data } : data;

  return new Scale(config, margin);
}

