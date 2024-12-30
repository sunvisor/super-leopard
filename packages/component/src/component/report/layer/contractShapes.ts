/**
 * ContractShapes
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createShapes, LayerData } from '@sunvisor/super-leopard-core';

export default function contractShapes(layers: LayerData[]) {
  return layers.map(layer => {
    const { shapes, ...rest } = layer;
    return {
      ...rest,
      shapes: createShapes(shapes),
    }
  });
}
