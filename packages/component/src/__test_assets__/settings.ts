/**
 * Test data for Settings
 *
 * Created by sunvisor on 2025/02/20.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { defaultSettings, SettingData } from '../settings';
import { testImageListData } from './testImages';
import { testFontMap } from './font';


export const testSettings: SettingData = {
  ...defaultSettings,
  fontMap: testFontMap,
  image: {
    ...defaultSettings.image,
    getImageUrl: (src: string) => `/api/images/${src}`,
    getImageList: async () => testImageListData,
  }
}
