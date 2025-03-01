import { LayerData }   from '@sunvisor/super-leopard-core';
import { shapeTestData, shapeTestData2, fieldTestData } from '@sunvisor/super-leopard-test-assets';


export const layerTestData: LayerData[] = [
  { name: 'layer1', shapes: [...shapeTestData, ...fieldTestData] },
  { name: 'layer2', shapes: shapeTestData2 },
  { name: 'layer3', shapes: [] },
  { name: 'layer4', shapes: [] },
];
