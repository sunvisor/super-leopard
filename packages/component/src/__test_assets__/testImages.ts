
/**
 * TestImages
 *
 * Created by sunvisor on 2024/03/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ImageListData } from '../component';
import { ImageOptions } from '../settings';


export const testNoImageUrl = '/api/images/no_image.svg';
export const testImageListData: ImageListData[] = [

  {
    "type": "image/jpeg",
    "name": "sample01.jpg"
  },
  {
    "type": "image/jpeg",
    "name": "sample02.jpg"
  },
  {
    "type": "image/jpeg",
    "name": "sample03.jpg"
  },
  {
    "type": "image/jpeg",
    "name": "sample04.jpg"
  },
  {
    "type": "image/jpeg",
    "name": "sample05.jpg"
  },
]

export const testImageOptions: ImageOptions = {
  getImageUrl: (name: string) => {
    return `/api/images/${name}`
  },
  noImageUrl: testNoImageUrl,
  getImageList: async () => {
    return testImageListData;
  },
}
