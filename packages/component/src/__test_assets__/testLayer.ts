import { testAssets, LayerData }   from '@sunvisor/super-leopard-core';


const { shapeTestData, shapeTestData2, fieldTestData } = testAssets;

export const layerTestData: LayerData[] = [
  { name: 'layer1', shapes: [...shapeTestData, ...fieldTestData] },
  { name: 'layer2', shapes: shapeTestData2 },
  { name: 'layer3', shapes: [] },
  { name: 'layer4', shapes: [] },
];
