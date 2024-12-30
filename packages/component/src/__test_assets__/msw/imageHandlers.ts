// noinspection TypeScriptValidateJSTypes

/**
 * ImageHandlers
 *
 * Created by sunvisor on 2024/03/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { http, HttpResponse } from 'msw';
import { ImageListData } from '../../component';

export default function imageHandler(data: ImageListData[]) {
  return [
    http.get('/api/images', () => {
      return HttpResponse.json(data);
    }),
    http.post('/api/images', () => {
      return HttpResponse.json({
        success: true,
        image: 'sample05.jpg'
      });
    })
  ];
}
