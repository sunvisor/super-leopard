/**
 * SerializeScale
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Scale } from "../object";
import { ScaleData } from "../data";

export function serializeScale(scale: Scale): ScaleData {
  return scale.config;
}
